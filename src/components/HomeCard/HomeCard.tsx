import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card.tsx';
import { Badge } from '@/components/ui/Badge.tsx';
import { AmountCard } from '@/components/AmountCard/AmountCard.tsx';
import { HoldingsCard } from '@/components/HoldingsCard/HoldingsCard.tsx';
import { DescriptionCard } from '@/components/DescritptionCard/DescriptionCard.tsx';
import { AppLink } from '@/components/AppLink/AppLink.tsx';

export interface HomeCardProps {
  title: string
  badges?: string[]
  content: {
    amount: {
      title: string,
      number: string
    },
    holdings: {
      title: string
    },
    description: {
      title: string,
      text: string
    }
  }
}

export const HomeCard = (props: HomeCardProps) => {
  const {
    title,
    badges,
    content
  } = props;

  const {
    amount,
    holdings,
    description
  } = content;

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
      <CardContent className={'flex flex-col gap-4 py-6'}>
        <AmountCard variant={'bordered'} amount={amount}/>
        <HoldingsCard variant={'bordered'} holdings={holdings}/>
        <DescriptionCard variant={'bordered'} description={description}/>
      </CardContent>
      <CardFooter>
        <AppLink to={'/classic'} variant={'solid'} className={'w-full'}>
          go to classic
        </AppLink>
      </CardFooter>
    </Card>
  )
}