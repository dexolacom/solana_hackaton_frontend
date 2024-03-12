import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card.tsx';
import { Button } from '@/components/ui/Button.tsx';
import defaultCard from '@/assets/defaultCard.png'
import { ArrowUpDown } from 'lucide-react';
import { Flame } from 'lucide-react';
import { useModalsContext } from '@/providers/ModalProvider/ModalProvider.tsx';

interface NftCardProps {
  title: string
  content: {
    price: string
    invested: string
  }
}

export const NftCard = (props: NftCardProps) => {
  const {title, content} = props
  const { setModalName } = useModalsContext()

  return (
    <Card>
      <img
        src={defaultCard}
        style={{width: 'calc(100% + 48px)', maxWidth: 'none'}}
        className={'rounded-md mb-6 -ml-[24px] -mt-[24px] rounded-b-none'}
      />

      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
          <div className={'flex items-center justify-between'}>
            <span className={'font-regular text-sm text-card-additionalForeground'}>Invested</span>
            <span className={'font-roboto font-medium'}>{content?.invested}</span>
          </div>
          <div className={'flex items-center justify-between'}>
            <span className={'font-regular text-sm text-card-additionalForeground'}>Current Price</span>
            <span className={'font-roboto font-medium'}>{content.price}</span>
          </div>
      </CardContent>
      <CardFooter className={'flex gap-4 pt-6'}>
        <Button className={'flex-1 gap-2'} variant={'accent'}>
          <ArrowUpDown className={'w-4 h-4'}/>
          Transfer
        </Button>
        <Button className={'flex-1 gap-2'} variant={'destructive'} onClick={() => setModalName('BURN_NFT')}>
          <Flame className={'w-4 h-4'}/>
          Burn
        </Button>
      </CardFooter>
    </Card>
  )
}