import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form.tsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select.tsx'
import { Input } from '@/components/ui/Input.tsx'
import { Button } from '@/components/ui/Button.tsx'
import { InfoCard } from '@/components/widgets/cards/InfoCard/InfoCard.tsx'
import { FormCurrency } from '@/components/common/FormCurrency/FormCurrency.tsx'
import { useClassicForm } from '@/components/features/forms/ClassicForm/lib.tsx'
import { useFormInfo } from '@/lib/hooks/useFormInfo.ts'

export const ClassicForm = () => {
  const { form, onSubmit } = useClassicForm()
  const infoCardData = useFormInfo(form.watch())

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
                <Input
                  type="number"
                  pattern="/^-?\d+\.?\d*$/"
                  onInput={(e) =>
                    ((e.target as HTMLInputElement).value = (e.target as HTMLInputElement).value.slice(0, 10))
                  }
                  placeholder="Enter amount of investment"
                  {...field}
                />
              </FormControl>
              <FormDescription>MIN sum invested should be ≥ $100</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amountCurrency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount Currency</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={'USDT'}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="USDT">USDT</SelectItem>
                  <SelectItem value="SOL">SOL</SelectItem>
                </SelectContent>
              </Select>
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
                    <SelectValue placeholder="Select the currency of withdrawal" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="tokens">Tokens</SelectItem>
                  <SelectItem value={form.getValues().amountCurrency}>Hello</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <InfoCard data={infoCardData} />
        <FormCurrency />
        <Button variant={'accent'} className={'w-full gap-2'}>
          Invest
        </Button>
      </form>
    </Form>
  )
}
