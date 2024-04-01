import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from '@/lib/hooks/useToast.ts'

export const useHoldingsForm = () => {
  const FormSchema = z.object({
    portfolio: z.string().min(1, {
      message: 'This field cannot be blank',
    }),
    amount: z.coerce.number().gte(100, {
      message: 'Should be at least $100',
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
      portfolio: '',
      // @ts-ignore
      amount: '',
      amountCurrency: 'USDC',
      withdrawal: '',
    },
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
