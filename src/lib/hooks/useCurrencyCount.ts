import { getFormCurrencyValues } from '@/components/features/forms/ClassicForm/lib';
import { classicCurrencyInfo, solanaCurrencyInfo } from '../constants';

interface UseCurrencyCountProps {
  solanaRate: number;
  amount: number;
  currency : string;
  currenciesVariant: string;
}

export const useCurrencyCount = ({solanaRate, amount, currenciesVariant, currency}: UseCurrencyCountProps) => {
  
  const amountWithCurrency = currency === 'USDC' ? amount : amount * solanaRate;

  const currencyInfo = currenciesVariant === 'classic' ? classicCurrencyInfo : solanaCurrencyInfo;
  const formCurrencyData = getFormCurrencyValues(amountWithCurrency, currencyInfo);
  const currencyColumns =
    currenciesVariant === 'classic'
      ? { firstColumn: [0, 4], secondColumn: [4, formCurrencyData.length] }
      : { firstColumn: [0, 5], secondColumn: [5, formCurrencyData.length] };

      return {currencyColumns, formCurrencyData};
};
