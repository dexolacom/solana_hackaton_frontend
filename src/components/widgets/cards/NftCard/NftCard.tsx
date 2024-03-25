import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card.tsx'
import { Button } from '@/components/ui/Button.tsx'
import defaultCard from '@/assets/defaultCard.png'
import { ArrowUpDown } from 'lucide-react'
import { Flame } from 'lucide-react'
import { useModalsContext } from '@/providers/ModalProvider/ModalProvider.tsx'
import { Link } from 'react-router-dom'
import { currencyIcons } from '@/lib/constants.tsx'

interface NftCardProps {
  title: string
  id: number
  content: {
    price: string
    invested: string
  }
}

export const NftCard = (props: NftCardProps) => {
  const { title, content, id } = props
  const { setModalName } = useModalsContext()
  const classicIcons = ['BTC', 'SOL', 'ETH', 'JUP', 'RNDR', 'HNT', 'BONK', 'PYTH']
  const solanaIcons = ['SOL', 'JUP', 'RNDR', 'HNT', 'BONK', 'PYTH', 'RAY', 'JTO', 'WIF']

  return (
    <Link to={`${title}/${id}`}>
      <Card>
        <img
          src={defaultCard}
          style={{ width: 'calc(100% + 48px)', maxWidth: 'none' }}
          className={'rounded-md mb-6 -ml-[24px] -mt-[24px] rounded-b-none'}
        />

        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={'flex items-center gap-2 mb-4'}>
            {title === 'classic'
              ? classicIcons.map((icon) => <img key={icon} className={'h-6 w-6 -mt-[3px]'} src={currencyIcons[icon]} />)
              : solanaIcons.map((icon) => <img key={icon} className={'h-6 w-6 -mt-[3px]'} src={currencyIcons[icon]} />)}
          </div>
          <div className={'flex items-center justify-between'}>
            <span className={'font-regular text-sm text-card-additionalForeground'}>Invested</span>
            <span className={'font-roboto text-sm font-medium'}>{content?.invested}</span>
          </div>
          <div className={'flex items-center justify-between'}>
            <span className={'font-regular text-sm text-card-additionalForeground'}>Current Price</span>
            <span className={'font-roboto text-sm font-medium'}>{content.price}</span>
          </div>
        </CardContent>
        <CardFooter className={'flex gap-4 pt-6'}>
          <Button className={'flex-1 gap-2'} variant={'accent'}>
            <ArrowUpDown className={'w-4 h-4'} />
            Transfer
          </Button>
          <Button className={'flex-1 gap-2'} variant={'destructive'} onClick={() => setModalName('BURN_NFT')}>
            <Flame className={'w-4 h-4'} />
            Burn
          </Button>
        </CardFooter>
      </Card>
    </Link>
  )
}
