import { CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card.tsx'
// import { InfoCard } from '@/components/widgets/cards/InfoCard/InfoCard.tsx'
import { Button } from '@/components/ui/Button.tsx'
import { Loader2 } from 'lucide-react'
import { useModalsContext } from '@/providers/ModalProvider/ModalProvider.tsx'
import { InfoCard } from '@/components/widgets/cards/InfoCard/InfoCard.tsx'

export const BurnNftModal = () => {
  const tempData = [
    {
      title: 'Current NFT Price',
      value: '$226,960.94',
    },
    {
      title: 'Transaction Fee, 0.5%',
      value: '$4,539.22',
    },
    {
      title: 'You will get',
      value: '$222,421.72',
    },
    {
      title: 'Wallet Address',
      value: '0x63E4...950fe8',
    },
  ]

  const { setModalName } = useModalsContext()
    const isLoading = false;
  return (
    <>
      <CardHeader>
        <CardTitle className={'text-2xl'}>Burn nft</CardTitle>
      </CardHeader>
      <CardContent className={'flex flex-col gap-4'}>
        <p className={'text-sm'}>
          Please, confirm you’re going to burn <span className={'font-black'}>Solana Ecosystem: #0001</span>. This
          action cannot be undone.
        </p>
        <InfoCard data={tempData} />
      </CardContent>
      <CardFooter className={'gap-4 mt-6'}>
        <Button variant={'secondary'} className={'flex-1'} onClick={() => setModalName('')}>
          Cancel
        </Button>
        <Button variant={'accent'} className={'flex-1'} onClick={() => setModalName('')}>
          {isLoading && <Loader2 className='animate-spin' />}
          Confirm
        </Button>
      </CardFooter>
    </>
  )
}
