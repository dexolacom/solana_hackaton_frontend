import { TableData } from '../columns';
import { useTokenList } from './useTokenList';
import { classicTemplate } from '@/lib/constants';

export const useTableData = () => {
  const { tokenList } = useTokenList();

  const stub: TableData = {
    symbol: '',
    icon: '',
    distribution: '',
    name: '',
    riskType: 'Low',
    coinmarketcapId: 0,
  }

  const dataTable: TableData[] = classicTemplate.map(item => {
    const match = tokenList?.find(dataItem => dataItem.symbol === item.symbol);
    if (match) {
      return {
        ...item,
        name: match.name,
        riskType: match.riskType,
        coinmarketcapId: match.coinmarketcapId
      };
    } else {
      return stub;
    }
  });

  return { dataTable };
}