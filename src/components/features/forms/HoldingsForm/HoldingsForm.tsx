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
import { useHoldingsForm } from '@/components/features/forms/HoldingsForm/lib.tsx'

export const HoldingsForm = () => {
  const { form, onSubmit } = useHoldingsForm()
  const tempInfoData = [
    {
      title: 'Amount in USD',
      value: '$ 2',
    },
    {
      title: 'Slippage Tolerance',
      value: '0.2 %',
    },
    {
      title: 'Platform Fee, 0.5%',
      value: '$ 0.33',
    },
  ]

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={'flex flex-col gap-4'}>
        <FormField
          control={form.control}
          name="portfolio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Portfolio</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select portfolio from the list" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="classic">Classic</SelectItem>
                  <SelectItem value="classicEarn">Classic + Earn</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

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
              <Select onValueChange={field.onChange} defaultValue={'USDC'}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="USDC">USDC</SelectItem>
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
                  <SelectItem value="btc">BTC</SelectItem>
                  <SelectItem value="eth">ETH</SelectItem>
                  <SelectItem value="sol">SOL</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <InfoCard data={tempInfoData} />
        <Button variant={'accent'} className={'w-full gap-2'}>
          Invest
        </Button>
      </form>
    </Form>
  )
}
