import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card.tsx';
import { Button } from '@/components/ui/Button.tsx';
import defaultCard from '@/assets/defaultCard.png'

interface NftCardProps {
  title: string
  content: {
    price: string
    invested: string
  }
}

export const NftCard = (props: NftCardProps) => {
  const {title, content} = props

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
            <span className={'font-regular text-sm text-gray-500'}>Invested</span>
            <span className={'font-roboto font-medium'}>{content?.invested}</span>
          </div>
          <div className={'flex items-center justify-between'}>
            <span className={'font-regular text-sm text-gray-500'}>Current Price</span>
            <span className={'font-roboto font-medium'}>{content.price}</span>
          </div>
      </CardContent>
      <CardFooter className={'flex gap-4 pt-6'}>
        <Button className={'flex-1'} variant={'accent'}>Transfer</Button>
        <Button className={'flex-1'} variant={'destructive'}>Burn</Button>
      </CardFooter>
    </Card>
  )
}