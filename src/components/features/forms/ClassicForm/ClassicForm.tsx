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
import { getFormCurrencyValues, useClassicForm } from '@/components/features/forms/ClassicForm/lib.tsx'
import { useFormInfo } from '@/lib/hooks/useFormInfo.ts'
import { useEffect } from 'react'
import { onlyIntegersInputValidator } from '@/lib/formUtils/formUtils.tsx'
import { classicCurrencyInfo, solanaCurrencyInfo } from '@/lib/constants.tsx'

interface ClassicFormProps {
  currenciesVariant?: 'classic' | 'solana'
}

export const ClassicForm = (props: ClassicFormProps) => {
  const { currenciesVariant = 'classic' } = props

  const { form, onSubmit } = useClassicForm()
  const infoCardData = useFormInfo(form.watch())
  const amount = form.watch('amount')

  const currencyInfo = currenciesVariant === 'classic' ? classicCurrencyInfo : solanaCurrencyInfo
  const formCurrencyData = getFormCurrencyValues(amount, currencyInfo)

  // const amountCurrency = form.watch('amountCurrency')

  // const currencys = ['USDT', 'SOL']

  // useEffect(() => {
  //   if (amountCurrency === 'USDT') {
  //     form.setValue('withdrawal', 'USDT')
  //   } else {
  //     form.setValue('withdrawal', 'SOL')
  //   }
  // }, [amountCurrency])

  // let selectOptions: string[] = []
  //
  // if (amountCurrency === 'USDT') {
  //   selectOptions = ['Tokens', 'USDT']
  // } else if (amountCurrency === 'SOL') {
  //   selectOptions = ['Tokens', 'SOL']
  // } else {
  //   selectOptions = []
  // }

  // useEffect(() => {
  //   form.resetField('withdrawal')
  // }, [amountCurrency])

  useEffect(() => {
    onlyIntegersInputValidator()
  }, [])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={'flex flex-col gap-4'}>
        <FormField
          control={form.control}
          name='amount'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  data-value={'numericInput'}
                  type='text'
                  maxLength={10}
                  placeholder='Enter amount of investment'
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
          name='amountCurrency'
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
                  <SelectItem value='USDT'>USDT</SelectItem>
                  <SelectItem value='SOL'>SOL</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='withdrawal'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Withdrawal Currency</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select the currency of withdrawal' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='Tokens'>Tokens</SelectItem>
                  <SelectItem value='USDT'>USDT</SelectItem>
                  <SelectItem value='SOL'>SOL</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <InfoCard data={infoCardData} />
        <FormCurrency data={formCurrencyData} />
        <Button variant={'accent'} className={'w-full gap-2'}>
          Invest
        </Button>
      </form>
    </Form>
  )
}
