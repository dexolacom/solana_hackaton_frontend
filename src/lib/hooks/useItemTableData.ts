import { TableData } from '../../components/features/tabels/ClassicPageTable/lib/columns';
import { useProjectList } from '../api/hooks/useProjectList';
import { useSolanaProjectById } from '../api/hooks/useSolanaProjectById';
import { currencyFormatter } from '@/lib/utils';
import { useLocation } from 'react-router-dom';
import { useNftData } from '../blockchain/hooks/useNftData';

interface TemplateType {
  symbol: string;
  icon: string;
  distribution: string;
}

interface UseTableData {
  template: TemplateType[];
}

export const useItemTableData = ({ template }: UseTableData) => {
  const { cards, isLoading: isLoadingNftData } = useNftData();
  const { pathname } = useLocation();

  const projectName = pathname.includes('Classic') ? 'Classic' : 'Solana Ecosystem';
  const { projectList, isLoading: isLoadingId } = useProjectList();
  const id = projectList?.find((item) => item.name === projectName)?.id;
  const { projectById, isLoading: isLoadingPrj } = useSolanaProjectById(id ?? '');

  const nftId = decodeURIComponent(pathname).replace(/\D/g, '');
  const tokensAmount = cards?.['all']?.filter((card) => card?.name?.replace(/\D/g, '') === nftId)?.[0]?.content
    ?.coinAmounts;

  const isLoading = isLoadingId || isLoadingPrj || isLoadingNftData;

  const stub: TableData = {
    symbol: '',
    icon: '',
    distribution: '',
    name: '',
    riskType: 'Low',
    coinPrice: '',
    change24h: '',
    marketCap: ''
  };

  const dataTable: TableData[] = template.map((item) => {
    const match = projectById?.find((dataItem) => dataItem.symbol === item.symbol);
    if (match) {
      return {
        ...item,
        name: match.name,
        riskType: match.riskType,
        coinPrice: currencyFormatter(match.coinPrice, 5),
        change24h: `${match.change24h?.toFixed(2)}%`,
        marketCap: currencyFormatter(match.marketCap),
        coinAmount: tokensAmount?.[item.symbol]?.uiAmount ?? 0
      };
    } else {
      return stub;
    }
  });

  return { dataTable, isLoading };
};
