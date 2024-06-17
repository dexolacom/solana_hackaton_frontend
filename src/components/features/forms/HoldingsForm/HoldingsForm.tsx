import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/Form.tsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select.tsx';
import { Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/Input.tsx';
import { Button } from '@/components/ui/Button.tsx';
import { FeeCard } from '@/components/widgets/cards/FeeCard/FeeCard.tsx';
import { useHoldingsForm } from '@/components/features/forms/HoldingsForm/lib.tsx';
import { useFormInfo } from '@/lib/hooks/useFormInfo.ts';
import { useEffect } from 'react';
import { onlyIntegersInputValidator } from '@/lib/formUtils/formUtils.tsx';
import { useCurrencyCount } from '@/lib/hooks/useCurrencyCount';
import { useDebounce } from '@/lib/hooks/useDebounce';
import { FormCurrency } from '@/components/common/FormCurrency/FormCurrency';

export const HoldingsForm = () => {
  const { form, onSubmit, isLoading, solanaRate } = useHoldingsForm();
  const infoCardData = useFormInfo(form.watch());
  const amount = useDebounce(form.watch('amount'));
  const currency = form.watch('amountCurrency');
  const currenciesVariant = form.watch('portfolio');

  const {currencyColumns, formCurrencyData} = useCurrencyCount({
    solanaRate: solanaRate ?? 0,
    amount,
    currency,
    currenciesVariant
  });

  useEffect(() => {
    onlyIntegersInputValidator();
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={'flex flex-col gap-4'}>
        <FormField
          control={form.control}
          name='portfolio'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Portfolio</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select portfolio from the list' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='classic'>Classic</SelectItem>
                  <SelectItem value='ecosystem'>Solana Ecosystem</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

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
              <Select onValueChange={field.onChange} defaultValue={'USDC'}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='USDC'>USDC</SelectItem>
                  <SelectItem value='SOL'>SOL</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <FormField
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
                  <SelectItem value='USDC'>USDC</SelectItem>
                  <SelectItem value='SOL'>SOL</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <FeeCard data={infoCardData} />
        {currenciesVariant && <FormCurrency data={formCurrencyData} columns={currencyColumns} />}
        <Button variant={'accent'} className={'w-full gap-2'} disabled={isLoading}>
          {isLoading && <Loader2 className='animate-spin' />}
          <span>Invest</span>
        </Button>
      </form>
    </Form>
  );
};
