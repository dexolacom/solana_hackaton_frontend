import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { generateRandomNumber } from '@/lib/utils';
import { useMintPortfolio } from '@/lib/blockchain/hooks/useMintPortfolio';
// import { useBuyNftByNative } from '@/lib/blockchain/hooks/useBuyNftByNative';
import { useSolanaRate } from '@/lib/api/hooks/useSolanaRate';
import {
  classicPotrfolioId,
  ecosystemPortfolioId
} from '@/lib/blockchain/constant';

export const useHoldingsForm = () => {
  const FormSchema = z
    .object({
      portfolio: z.string().min(1, {
        message: 'This field cannot be blank'
      }),
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
      portfolio: '',
      // @ts-ignore
      amount: '',
      amountCurrency: 'USDC'
      // withdrawal: '',
    }
  });

  const currenciesVariant = form.watch('portfolio');
  const swapCount = currenciesVariant === 'classic' ? 4 : 5;
  const { mintPortfolio, isLoading: isLoadingToken } = useMintPortfolio(swapCount);
  // const { buy: buyNftByNative, isLoading: isLoadingNative } = useBuyNftByNative();
  const { solanaRate } = useSolanaRate();

  const isLoading = isLoadingToken;
  // || isLoadingNative

  async function onSubmit(data: z.infer<typeof FormSchema>) {

    if (data.amountCurrency === 'USDC') {
      mintPortfolio({
        inputValue: +data.amount,
        portfolioId: generateRandomNumber(),
        collectionId: currenciesVariant === 'classic' ? classicPotrfolioId : ecosystemPortfolioId
      });
      return;
    }
    // await buyNftByNative({ inputValue: +data.amount, nftId: generateRandomNumber(), mintCollection })
  }

  return { form, onSubmit, isLoading, solanaRate };
};
