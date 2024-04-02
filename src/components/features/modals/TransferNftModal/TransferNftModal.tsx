import { CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card.tsx'
import { Button } from '@/components/ui/Button.tsx'
import { useModalsContext } from '@/providers/ModalProvider/ModalProvider.tsx'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form.tsx'

import { Input } from '@/components/ui/Input.tsx'
import { useTransferForm } from './lib'


export const TransferNftModal = () => {

  const { setModalName, mint } = useModalsContext()
  const { onSubmit, form } = useTransferForm(mint);

  return (
    <>
      <CardHeader>
        <CardTitle className={'text-2xl'}>Transfer nft</CardTitle>
      </CardHeader>
      <CardContent className={'flex flex-col gap-4'}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className={'flex flex-col gap-4'}>
            <FormField
              control={form.control}
              name='address'
              render={({ field }) => (
                <FormItem className='h-[80px]'>
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
            <CardFooter className={'gap-4 mt-6'}>
              <Button variant={'secondary'} className={'flex-1'} type='button' onClick={() => setModalName('')}>
                Cancel
              </Button>
              <Button variant={'accent'} className={'flex-1'} type='submit' >
                Confirm
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </>
  )
}
