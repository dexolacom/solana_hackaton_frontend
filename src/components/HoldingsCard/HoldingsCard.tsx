import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card.tsx';
import { HoldingsCardProgress } from '@/components/HoldingsCardProgress/HoldingsCardProgress.tsx';

interface HoldingsCardProps {
  holdings: {
    title: string
  }
}

export const HoldingsCard = (props: HoldingsCardProps) => {
  const { holdings } = props
  const { title } = holdings

  return (
    <Card className={'border'}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <HoldingsCardProgress/>
      </CardContent>
    </Card>
  )
}