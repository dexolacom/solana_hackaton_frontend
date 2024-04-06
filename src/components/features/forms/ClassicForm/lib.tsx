import { useLocation } from 'react-router-dom'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { generateRandomNumber } from '@/temp/utils/generateRandomNumber'
import { useBuyNftByToken } from '@/lib/blockchain/hooks/useBuyNftByToken'
import { useBuyNftByNative } from '@/lib/blockchain/hooks/useBuyNftByNative';
import { useSolanaRate } from '@/lib/api/hooks/useSolanaRate';
import { addressClassicCollection, addressEcosystemCollection } from '@/lib/blockchain/constant';

// TODO: add debounce for amount field

export const useClassicForm = () => {

  const { pathname } = useLocation();
  const { buy: buyNftByToken, isLoading: isLoadingToken } = useBuyNftByToken();
  const { buy: buyNftByNative, isLoading: isLoadingNative } = useBuyNftByNative();
  const { solanaRate } = useSolanaRate();

  const isClassicColection = pathname.includes('classic');
  const mintCollection = isClassicColection ? addressClassicCollection : addressEcosystemCollection;
  const isLoading = isLoadingToken || isLoadingNative

  const FormSchema = z.object({
    amount: z.coerce.number(),
    amountCurrency: z.string().min(1, {
      message: 'This field cannot be blank',
    }),
    // withdrawal: z.string().min(1, {
    //   message: 'This field cannot be blank',
    // }),
  }).refine((data) => {
    if (data.amountCurrency === 'USDC') {
      return data.amount >= 2;
    } else if (data.amountCurrency === 'SOL') {
      return solanaRate && (data.amount >= 2 / solanaRate);
    }

    return true;
  }, {
    message: 'Should be at least $2',
    path: ['amount'],
  });


  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      // @ts-ignore
      amount: '',
      amountCurrency: 'USDC',
      // withdrawal: '',
    },
    // mode: 'onChange',
  })

  function onSubmit(data: z.infer<typeof FormSchema>,) {
    if (data.amountCurrency === 'USDC') {
      buyNftByToken({ inputValue: +data.amount, nftId: generateRandomNumber(), mintCollection })
      return;
    }
    buyNftByNative({ inputValue: +data.amount, nftId: generateRandomNumber(), mintCollection })
  }
  return { form, onSubmit, solanaRate, isLoading }
}

export const getFormCurrencyValues = (amount: string | number, currencyInfo: { title: string; percent: number }[]) => {
  return currencyInfo.map((currency) => ({
    title: currency.title,
    value: currency.percent * +amount,
  }))
}
