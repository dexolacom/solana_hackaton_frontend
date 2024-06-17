import { useEffect, useState } from 'react';
import { useSolanaRate } from '@/lib/api/hooks/useSolanaRate.ts';
import { useDebounce } from './useDebounce';

type FormData = {
  amount: string | number;
  amountCurrency: string;
  // withdrawal: string | string[]
};

export const useFormInfo = (formData: FormData) => {
  const { solanaRate } = useSolanaRate();
  const amount = useDebounce(formData.amount);
  const amountCurrency = formData.amountCurrency;
  const [amountUSD, setAmountUSD] = useState(0);
  const [fee, setFee] = useState(0);

  useEffect(() => {
    if (amount === '') {
      setFee(0);
      setAmountUSD(0);
      return;
    }

    if (formData.amountCurrency === 'SOL') {
      if (solanaRate) {
        setAmountUSD(+(+amount * solanaRate).toFixed(2));
      }
      setFee(+(amountUSD * 0.005).toFixed(2));
    } else {
      setAmountUSD(+amount);
      setFee(+(+amount * 0.005).toFixed(2));
    }
  }, [amount, amountCurrency, amountUSD]);

  return [
    {
      title: 'Amount in USD',
      value: `$${amountUSD}`
    },
    {
      title: 'Slippage Tolerance',
      value: `1%`
    },
    {
      title: 'Platform Fee, 0.5%',
      value: `$${fee}`
    }
  ];
};
