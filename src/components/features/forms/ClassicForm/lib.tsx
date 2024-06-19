// import { useLocation } from 'react-router-dom'
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMintPortfolio } from '@/lib/blockchain/hooks/useMintPortfolio';
// import { useBuyNftByNative } from '@/lib/blockchain/hooks/useBuyNftByNative';
import { useSolanaRate } from '@/lib/api/hooks/useSolanaRate';
import { generateRandomNumber } from '@/lib/utils';
import {
  classicPotrfolioId,
  ecosystemPortfolioId
  //  addressEcosystemCollection
} from '@/lib/blockchain/constant';

export const useClassicForm = (currenciesVariant: 'classic' | 'solana') => {
  // const { pathname } = useLocation();
  const { mintPortfolio, isLoading: isLoadingToken } = useMintPortfolio(currenciesVariant === 'classic' ? 4 : 5);
  // const { buy: buyNftByNative, isLoading: isLoadingNative } = useBuyNftByNative();
  const { solanaRate } = useSolanaRate();

  // const isClassicColection = pathname.includes('classic');
  // const mintCollection = isClassicColection ? addressClassicCollection : addressEcosystemCollection;

  const isLoading = isLoadingToken;
  // || isLoadingNative

  const FormSchema = z
    .object({
      amount: z.coerce.number(),
      amountCurrency: z.string().min(1, {
        message: 'This field cannot be blank'
      })
      // withdrawal: z.string().min(1, {
      //   message: 'This field cannot be blank',
      // }),
    })
    .refine(
      (data) => {
        if (data.amountCurrency === 'USDC') {
          return data.amount >= 100;
        } else if (data.amountCurrency === 'SOL') {
          return solanaRate && data.amount >= 100 / solanaRate;
        }

        return true;
      },
      {
        message: 'Should be at least $100',
        path: ['amount']
      }
    );

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      // @ts-ignore
      amount: '',
      amountCurrency: 'USDC'
      // withdrawal: '',
    }
    // mode: 'onChange',
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (data.amountCurrency === 'USDC') {
      mintPortfolio({
        inputValue: +data.amount,
        portfolioId: generateRandomNumber(),
        collectionId: currenciesVariant === 'classic' ? classicPotrfolioId : ecosystemPortfolioId
      });
      return;
    }
    // buyNftByNative({ inputValue: +data.amount, nftId: generateRandomNumber(), mintCollection })
  }
  return { form, onSubmit, solanaRate, isLoading };
};

export const getFormCurrencyValues = (amount: string | number, currencyInfo: { title: string; percent: number }[]) => {
  return currencyInfo.map((currency) => ({
    title: currency.title,
    value: currency.percent * +amount
  }));
};
