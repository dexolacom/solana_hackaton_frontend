import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card.tsx';
import { Badge } from '@/components/ui/Badge.tsx';
import { AmountCard } from '@/components/AmountCard/AmountCard.tsx';
import { HoldingsCard } from '@/components/HoldingsCard/HoldingsCard.tsx';
import { DescriptionCard } from '@/components/DescritptionCard/DescriptionCard.tsx';
import { Button } from '@/components/ui/Button.tsx';

export interface HomeCardProps {
  title: string
  badges?: string[]
  content: {
    description: string
  }
}

export const HomeCard = (props: HomeCardProps) => {
  const {
    title,
    badges,
    content
  } = props;

  return (
    <Card>
      <CardHeader>
        <CardTitle className={'text-3xl font-semibold'}>
          {title}
        </CardTitle>
        <span className={'flex gap-2'}>
          {badges?.map((badge, i) => (
            <Badge key={i}>
              {badge}
            </Badge>
          ))}
        </span>
      </CardHeader>
      <CardContent className={'flex flex-col gap-4'}>
        <AmountCard/>
        <HoldingsCard/>
        <DescriptionCard text={content.description}/>
      </CardContent>
      <CardFooter>
        <Button className={'w-full uppercase'}>go to page</Button>
      </CardFooter>
    </Card>
  )
}