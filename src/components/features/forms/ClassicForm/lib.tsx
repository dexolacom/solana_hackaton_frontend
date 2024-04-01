import { useEffect } from 'react';
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from '@/lib/hooks/useToast.ts'
import { generateRandomNumber } from '@/temp/utils/generateRandomNumber'
import { useBuyNftByToken } from '@/lib/blockchain/hooks/useBuyNftByToken'

// TODO: add debounce for amount field

export const useClassicForm = () => {

  const { buyNftByToken, isError, isSuccess } = useBuyNftByToken();

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: 'Info',
        description: 'Operation is successful',
      })
    }
    if (isError) {
      toast({
        title: 'Error',
        description: 'Unsuccessful operation',
      })
    }
  }, [isError, isSuccess])

  const FormSchema = z.object({
    amount: z.coerce.number().gte(1, {   //!change to 100
      message: 'Should be at least $1',
    }),
    amountCurrency: z.string().min(1, {
      message: 'This field cannot be blank',
    }),
    withdrawal: z.string().min(1, {
      message: 'This field cannot be blank',
    }),
  })

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
