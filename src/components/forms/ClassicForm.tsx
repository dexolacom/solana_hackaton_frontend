import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form"
import { Input } from "@/components/ui/Input"
import { toast } from "@/lib/use-toast.ts"
import { Button } from '@/components/ui/Button.tsx';

const FormSchema = z.object({
  amount: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  withdrawal: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  })
})

export const ClassicForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      amount: "",
      withdrawal: ""
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={'flex flex-col gap-4'}>
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input placeholder="Enter amount of investment" {...field} />
              </FormControl>
              <FormDescription>
                MIN sum invested should be ≥ $100
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          render={({field}) => (
            <FormItem>
              <FormLabel>Withdrawal Currency</FormLabel>
              <FormControl>
                <Input placeholder="Select thye currency of withdraw" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          name={'withdrawal'}
        />
        <Button variant={'secondary'} className={'w-full'}>
          Invest
        </Button>
      </form>
    </Form>
  )
}