import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from '@/lib/hooks/useToast.ts'

export const useHoldingsForm = () => {
  const FormSchema = z.object({
    amount: z.string().min(2, {
      message: 'Username must be at least 2 characters.',
    }),
    amountCurrency: z.string().min(2, {
      message: 'Username must be at least 2 characters.',
    }),
    withdrawal: z.string().min(2, {
      message: 'Username must be at least 2 characters.',
    }),
    portfolio: z.string().min(2, {
      message: 'Username must be at least 2 characters.',
    }),
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      amount: '',
      amountCurrency: '',
      withdrawal: '',
      portfolio: '',
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return { form, onSubmit }
}
