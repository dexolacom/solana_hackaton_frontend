import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from '@/lib/hooks/useToast.ts'
import { currencyInfo } from '@/lib/constants.tsx'

// TODO: add debounce for amount field

export const useClassicForm = () => {
  const FormSchema = z.object({
    amount: z
      .string({
        required_error: 'Amount is empty',
      })
      .min(3, {
        message: 'should be ≥ $100',
      }),
    amountCurrency: z.string({ required_error: 'Amount currency is required' }),
    withdrawal: z.string({ required_error: 'Withdrawal currency is required' }),
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      amount: '',
      amountCurrency: 'USDT',
      withdrawal: '',
    },
    // mode: 'onChange',
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return { form, onSubmit }
}

export const getFormCurrencyValues = (amount: string | number) => {
  return currencyInfo.map((currency) => ({
    title: currency.title,
    value: currency.percent * +amount,
  }))
}
