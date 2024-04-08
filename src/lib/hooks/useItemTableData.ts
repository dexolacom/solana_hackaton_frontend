import { TableData } from '../../components/features/tabels/ClassicPageTable/lib/columns'
import { useProjectList } from '../api/hooks/useProjectList';
import { useSolanaProjectById } from '../api/hooks/useSolanaProjectById'
import { currencyFormatter } from '@/lib/utils'
import { useLocation } from 'react-router-dom';

interface TemplateType {
  symbol: string
  icon: string
  distribution: string
}

interface UseTableData {
  template: TemplateType[]
}

export const useItemTableData = ({ template }: UseTableData) => {
  const { pathname } = useLocation();
  const projectName = pathname.includes('Classic') ? 'Classic' : 'Solana Ecosystem';
  const { projectList, isLoading: isLoadingId } = useProjectList();
  const id = projectList?.find(item => item.name === projectName)?.id;
  const { projectById, isLoading: isLoadingPrj } = useSolanaProjectById(id ?? '');

  const isLoading = isLoadingId || isLoadingPrj;

  const stub: TableData = {
    symbol: '',
    icon: '',
    distribution: '',
    name: '',
    riskType: 'Low',
    coinPrice: '',
    change24h: '',
    marketCap: '',
  }

  const dataTable: TableData[] = template.map((item) => {
    const match = projectById?.find((dataItem) => dataItem.symbol === item.symbol)
    if (match) {
      return {
        ...item,
        name: match.name,
        riskType: match.riskType,
        coinPrice: currencyFormatter(match.coinPrice),
        change24h: `${match.change24h?.toFixed(2)}%`,
        marketCap: currencyFormatter(match.marketCap),
      }
    } else {
      return stub
    }
  })

  return { dataTable, isLoading }
}
