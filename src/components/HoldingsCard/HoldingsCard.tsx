import { Card, CardHeader, CardTitle } from '@/components/ui/Card.tsx';

interface HoldingsCardProps {
  holdings: {
    title: string
  }
}

export const HoldingsCard = (props: HoldingsCardProps) => {
  const { holdings } = props
  const {title} = holdings

  return (
    <Card className={'border'}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
    </Card>
  )
}