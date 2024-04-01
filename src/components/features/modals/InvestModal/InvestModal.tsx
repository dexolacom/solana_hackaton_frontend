import { CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card.tsx'
import { Button } from '@/components/ui/Button.tsx'
import { useModalsContext } from '@/providers/ModalProvider/ModalProvider.tsx'
import { ModalCurrency } from '@/components/common/ModalCurrency/ModalCurrency.tsx'

export const InvestModal = () => {
  const { setModalName } = useModalsContext()

  return (
    <>
      <CardHeader>
        <CardTitle className={'text-2xl'}>Investment Successful</CardTitle>
      </CardHeader>
      <CardContent className={'flex flex-col gap-4'}>
        <p className={'text-sm'}>
          You have successfully invested <span className={'font-medium'}>101 USDC</span> in{' '}
          <span className={'font-medium'}>Classical: #0001</span> NFT with following assets distribution:
        </p>
        <ModalCurrency />
      </CardContent>
      <CardFooter className={'gap-4 mt-6'}>
        <Button variant={'secondary'} className={'flex-1'} onClick={() => setModalName('')}>
          Close
        </Button>
        <Button variant={'accent'} className={'flex-1'} onClick={() => setModalName('')}>
          Go to my holdings
        </Button>
      </CardFooter>
    </>
  )
}
