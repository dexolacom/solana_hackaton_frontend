import { useEffect } from 'react';
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from '@/lib/hooks/useToast.ts'
import { generateRandomNumber } from '@/temp/utils/generateRandomNumber'
import { useBuyNftByToken } from '@/lib/blockchain/hooks/useBuyNftByToken'
import { useBuyNftByNative } from '@/lib/blockchain/hooks/useBuyNftByNative';
import { useSolanaRate } from '@/lib/api/hooks/useSolanaRate';
import { addressClassicCollection } from '@/lib/blockchain/constant';

// TODO: add debounce for amount field

export const useClassicForm = () => {

  const { buy: buyNftByToken, isError: isErrorToken, isSuccess: isSuccessToken, isLoading: isLoadingToken } = useBuyNftByToken();
  const { buy: buyNftByNative, isError: isErrorNative, isSuccess: isSuccessNative, isLoading: isLoadingNative } = useBuyNftByNative();
  const { solanaRate } = useSolanaRate();

  useEffect(() => {
    if (isSuccessToken || isSuccessNative) {
      toast({
        title: 'Info',
        description: 'Operation is successful',
      })
    }
    if (isErrorToken || isErrorNative) {
      toast({
        title: 'Error',
        description: 'Unsuccessful operation',
      })
    }
  }, [isSuccessToken, isErrorToken, isSuccessNative, isErrorNative])

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

  async function onSubmit(data: z.infer<typeof FormSchema>,) {
    if (data.amountCurrency === 'USDC') {
      await buyNftByToken({ inputValue: +data.amount, nftId: generateRandomNumber(), mintCollection: addressClassicCollection })
      return;
    }
    await buyNftByNative({ inputValue: +data.amount, nftId: generateRandomNumber(), mintCollection: addressClassicCollection })
    // toast({
    //   title: 'You submitted the following values:',
    //   description: (
    //     <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
    //       <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // })
  }
  return { form, onSubmit, solanaRate, isLoading }
}

export const getFormCurrencyValues = (amount: string | number, currencyInfo: { title: string; percent: number }[]) => {
  return currencyInfo.map((currency) => ({
    title: currency.title,
    value: currency.percent * +amount,
  }))
}
