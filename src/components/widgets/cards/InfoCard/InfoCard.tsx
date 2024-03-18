import { Card, CardContent } from '@/components/ui/Card.tsx'

interface InfoCardProps {
  data: {
    title: string
    number: string
  }[]
}

export const InfoCard = (props: InfoCardProps) => {
  const { data } = props

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
      {data.map((item, i) => (
        <div key={i} className={'flex items-center justify-between text-sm'}>
          <span className={'text-card-additionalForeground'}>{item?.title}</span>
          <span>{item?.number}</span>
        </div>
      ))}
    </Card>
  )
}
