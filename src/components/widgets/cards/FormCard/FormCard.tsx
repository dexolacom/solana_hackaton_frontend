import { Card, CardContent } from '@/components/ui/Card.tsx';

export const FormCard = () => {
  const tempData = [
    {
      title: 'Amount in USD',
      number: '$ 2'
    },
    {
      title: 'Slippage Tolerance',
      number: '0.2 %'
    },
    {
      title: 'Platform Fee, 0.5%',
      number: '$ 0.33'
    }
  ]

  return (
    <Card className={'p-4 bg-slate-500'}>
      <CardContent>
        {tempData.map((item, i) => (
          <div key={i} className={'flex items-center justify-between text-sm'}>
            <span className={'text-secondary-additionalForeground'}>{item?.title}</span>
            <span className={'text-primary-foreground font-roboto'}>{item?.number}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}