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
import { useClassicForm } from '@/components/widgets/ClassicForm/lib.tsx'
import { useEffect, useState } from 'react'

export const ClassicForm = () => {
  const { form, onSubmit } = useClassicForm()
  const amount = form.getValues().amount

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
                    <SelectValue placeholder="Select thye currency of withdraw" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="BTC">BTC</SelectItem>
                  <SelectItem value="ETH">ETH</SelectItem>
                  <SelectItem value="SOL">SOL</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <InfoCard amount={amount} />
        <FormCurrency />
        <Button variant={'accent'} className={'w-full gap-2'}>
          Invest
        </Button>
      </form>
    </Form>
  )
}
