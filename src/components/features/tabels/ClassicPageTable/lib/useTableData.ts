import { TableData } from './columns';
import { useProjectById } from '../../../../../lib/api/hooks/useProjectById';
import { classicTemplate } from '@/lib/constants';
import { currencyFormatter } from '@/lib/utils';

export const useTableData = (id?: string) => {

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

  const dataTable: TableData[] = classicTemplate.map(item => {
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