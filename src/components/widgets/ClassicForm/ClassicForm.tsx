import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form.tsx"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/Select.tsx';
import { Input } from "@/components/ui/Input.tsx"
import { Button } from '@/components/ui/Button.tsx';
import { FormCard } from '@/components/widgets/cards/FormCard/FormCard.tsx';
import { FormCurrency } from '@/components/common/FormCurrency/FormCurrency.tsx';
import { useClassicForm } from '@/components/widgets/ClassicForm/lib.tsx';
import { DollarSign } from 'lucide-react';


export const ClassicForm = () => {
  const { form, onSubmit } = useClassicForm()

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
          name="withdrawal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Withdrawal Currency</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select thye currency of withdraw" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="btc">BTC</SelectItem>
                  <SelectItem value="eth">ETH</SelectItem>
                  <SelectItem value="sol">SOL</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormCard/>
        <FormCurrency/>
        <Button variant={'accent'} className={'w-full gap-2'}>
          <DollarSign className={'w-4 h-4 mt-[3px]'}/>
          Invest
        </Button>
      </form>
    </Form>
  )
}