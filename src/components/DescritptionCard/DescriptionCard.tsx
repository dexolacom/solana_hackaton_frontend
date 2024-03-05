import { Card, CardContent, CardTitle } from '@/components/ui/Card.tsx';

interface DescriptionCardProps {
  description: {
    title: string
    text: string
  }
}

export const DescriptionCard = (props:DescriptionCardProps) => {
  const { description } = props

  const {
    title,
    text
  } = description;

  return (
    <Card className={'border'}>
      <CardTitle>
        {title}
      </CardTitle>
      <CardContent>
        {text}
      </CardContent>
    </Card>
  )
}