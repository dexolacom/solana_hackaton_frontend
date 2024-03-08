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
    <Card className={'border border-gray-500 p-4 bg-slate-500'}>
      <CardContent>
        {tempData.map((item, i) => (
          <div key={i} className={'flex items-center justify-between text-sm'}>
            <span className={'text-slate-300'}>{item?.title}</span>
            <span className={'text-primary-foreground font-roboto'}>{item?.number}</span>
          </div>
        ))}
        {/*<div className={'flex items-center justify-between text-sm'}>*/}
        {/*  <span className={'text-gray-500'}>Amount in USD</span>*/}
        {/*  <span className={'text-primary-foreground'}>$</span>*/}
        {/*</div>*/}
        {/*<div className={'flex items-center justify-between text-sm'}>*/}
        {/*  <span className={'text-gray-500'}>Slippage Tolerance</span>*/}
        {/*  <span className={'text-primary-foreground'}>%</span>*/}
        {/*</div>*/}
        {/*<div className={'flex items-center justify-between text-sm'}>*/}
        {/*  <span className={'text-gray-500'}>Platform Fee, 0.5%</span>*/}
        {/*  <span className={'text-primary-foreground'}>$</span>*/}
        {/*</div>*/}
      </CardContent>
    </Card>
  )
}