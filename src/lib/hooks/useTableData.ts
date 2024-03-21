import { TableData } from '../../components/features/tabels/ClassicPageTable/lib/columns';
import { useProjectById } from '../api/hooks/useProjectById';
import { currencyFormatter } from '@/lib/utils';

interface TemplateType {
  symbol: string,
  icon: string,
  distribution: string
}

interface UseTableData {
  id?: string,
  template: TemplateType[]
}

export const useTableData = ({ id, template }: UseTableData) => {

  const { projectById } = useProjectById(id);

  const stub: TableData = {
    symbol: '',
    icon: '',
    distribution: '',
    name: '',
    riskType: 'Low',
    coinPrice: '',
    change24h: '',
    marketCap: ''
  }

  const dataTable: TableData[] = template.map(item => {
    const match = projectById?.find(dataItem => dataItem.symbol === item.symbol);
    if (match) {
      return {
        ...item,
        name: match.name,
        riskType: match.riskType,
        coinPrice: currencyFormatter(match.coinPrice),
        change24h: `${match.change24h?.toFixed(2)}%`,
        marketCap: currencyFormatter(match.marketCap)
      };
    } else {
      return stub;
    }
  });

  return { dataTable };
}