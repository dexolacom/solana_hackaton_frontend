import { Card, CardContent } from '@/components/ui/Card.tsx'

interface InfoCardProps {
  amount: string | number
}

export const InfoCard = (props: InfoCardProps) => {
  const { amount } = props

  // const infoCardTitles = ['Amount in USD', 'Slippage Tolerance', 'Platform Fee, 0.5%']
  //
  // const infoCardData = [
  //   {
  //     title: '',
  //     number: '$',
  //   },
  //   {
  //     title: '',
  //     number: '1%',
  //   },
  //   {
  //     title: '',
  //     number: '$',
  //   },
  // ]

  return (
    <Card className={'bg-card border text-foreground'}>
      <CardContent className={'flex flex-col gap-1'}></CardContent>
      <div className={'flex items-center justify-between text-sm'}>
        <span className={'text-card-additionalForeground'}>Amount in USD</span>
        <span>11</span>
      </div>
    </Card>
  )
}
