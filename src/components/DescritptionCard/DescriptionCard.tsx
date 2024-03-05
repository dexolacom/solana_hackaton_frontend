import { Card, CardTitle } from '@/components/ui/Card.tsx';

export const DescriptionCard = ({text}: {text: string}) => {
  return (
    <Card className={'border'}>
      <CardTitle className={'font-medium'}>
        Desctiption
      </CardTitle>
      {text}
    </Card>
  )
}