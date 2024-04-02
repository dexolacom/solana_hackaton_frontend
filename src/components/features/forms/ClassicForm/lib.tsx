import { useEffect } from 'react';
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from '@/lib/hooks/useToast.ts'
import { generateRandomNumber } from '@/temp/utils/generateRandomNumber'
import { useBuyNftByToken } from '@/lib/blockchain/hooks/useBuyNftByToken'
import { useBuyNftByNative } from '@/lib/blockchain/hooks/useBuyNftByNative';
import { useSolanaRate } from '@/lib/api/hooks/useSolanaRate';

// TODO: add debounce for amount field

export const useClassicForm = () => {

  const { buyNftByToken, isError: isErrorToken, isSuccess: isSuccessToken } = useBuyNftByToken();
  const { buyNftByNative, isError: isErrorNative, isSuccess: isSuccessNative } = useBuyNftByNative();
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

  const FormSchema = z.object({
    amount: z.coerce.number(),
    amountCurrency: z.string().min(1, {
      message: 'This field cannot be blank',
    }),
    withdrawal: z.string().min(1, {
      message: 'This field cannot be blank',
    }),
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
      withdrawal: '',
    },
    // mode: 'onChange',
  })

  async function onSubmit(data: z.infer<typeof FormSchema>,) {
    if (data.amountCurrency === 'USDC') {
      await buyNftByToken({ inputValue: +data.amount, nftId: generateRandomNumber() })
      return;
    }
    await buyNftByNative({ inputValue: +data.amount, nftId: generateRandomNumber() })
    // toast({
    //   title: 'You submitted the following values:',
    //   description: (
    //     <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
    //       <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // })
  }
  return { form, onSubmit }
}

export const getFormCurrencyValues = (amount: string | number, currencyInfo: { title: string; percent: number }[]) => {
  return currencyInfo.map((currency) => ({
    title: currency.title,
    value: currency.percent * +amount,
  }))
}
