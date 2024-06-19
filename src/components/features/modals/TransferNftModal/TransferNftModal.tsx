import { CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card.tsx';
import { Button } from '@/components/ui/Button.tsx';
import { Loader2 } from 'lucide-react';
import { useModalsContext } from '@/providers/ModalProvider/ModalProvider.tsx';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form.tsx';

import { Input } from '@/components/ui/Input.tsx';
import { useTransferForm } from './lib';

const infoData = [
  {
    title: 'Double-Check the Address:',
    value: ' Verify that the wallet address is correct. NFT transfers are irreversible.'
  },
  {
    title: 'Copy & Paste the Address: ',
    value: ' To avoid typos, copy the address from the recipient and paste it here.'
  },
  {
    title: 'Use a Trusted Source:',
    value: ' Only send NFTs to a wallet address from a trusted source to prevent loss or theft.'
  }
];

export const TransferNftModal = () => {
  const { setModalName } = useModalsContext();
  const { onSubmit, form, isLoading } = useTransferForm();

  return (
    <>
      <CardHeader className='px-6 pt-6 pb-4 mb-0'>
        <CardTitle className={'text-xl font-bold'}>Transfer nft</CardTitle>
      </CardHeader>
      <CardContent className={'flex flex-col gap-2'}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className={'flex flex-col'}>
            <h2 className='px-6 mb-2 text-sm'>To ensure a smooth and secure transaction, keep these points in mind:</h2>
            <ul className='pl-12 pr-6 mb-4 text-sm list-disc'>
              {infoData.map((item, i) => (
                <li key={i}>
                  <span className='font-semibold'>{item.title}</span>
                  <span>{item.value}</span>
                </li>
              ))}
            </ul>
            <FormField
              control={form.control}
              name='address'
              render={({ field }) => (
                <FormItem className='h-[80px] px-6 mb-6'>
                  <FormLabel>Wallet address</FormLabel>
                  <FormControl>
                    <Input
                      // data-value={'numericInput'}
                      type='text'
                      maxLength={44}
                      placeholder='Enter wallet address'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <CardFooter className={'gap-4 px-6 pb-4 pt-6 border border-border justify-end'}>
              <Button variant={'outline'} type='button' onClick={() => setModalName('')}>
                Cancel
              </Button>
              <Button variant={'accent'} type='submit'>
                {isLoading && <Loader2 className='animate-spin mr-2' />}
                Confirm
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </>
  );
};
