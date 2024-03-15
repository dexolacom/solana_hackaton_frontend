import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card.tsx'
import { Badge } from '@/components/ui/Badge.tsx'
import { AmountCard } from '@/components/widgets/cards/AmountCard/AmountCard.tsx'
import { HoldingsCard } from '@/components/widgets/cards/HoldingsCard/HoldingsCard.tsx'
import { DescriptionCard } from '@/components/widgets/cards/DescritptionCard/DescriptionCard.tsx'
import { AppLink } from '@/components/common/AppLink/AppLink.tsx'
import { ArrowRight } from 'lucide-react'

export interface HomeCardProps {
  title: string
  badges?: string[]
  content: {
    amount: {
      title: string
      number: string
    }
    holdings: {
      title: string
      items: {
        name: string
        percent: string | number
      }[]
    }
    description: {
      title: string
      text: string
    }
  }
  linkPath: string
  buttonVariant: 'muted' | 'accent'
  amountCardVariant: 'accent' | 'accentTeal' | 'accentGray'
  progressVariant: 'classic' | 'classicEarn' | 'solana'
}

export const HomeCard = (props: HomeCardProps) => {
  const { title, badges, content, linkPath, buttonVariant, amountCardVariant, progressVariant } = props
  const { amount, holdings, description } = content

  return (
    <Card>
      <CardHeader className={'mb-0'}>
        <CardTitle className={'text-2xl font-semibold'}>{title}</CardTitle>
        <span className={'flex gap-2'}>{badges?.map((badge, i) => <Badge key={i}>{badge}</Badge>)}</span>
      </CardHeader>
      <CardContent className={'flex flex-col gap-4 py-6'}>
        <AmountCard amount={amount} variant={amountCardVariant} />
        <HoldingsCard variant={'bordered'} holdings={holdings} withIcon={false} progressVariant={progressVariant} />
        <DescriptionCard variant={'bordered'} description={description} withIcon={false} />
      </CardContent>
      <CardFooter>
        <AppLink to={linkPath} variant={buttonVariant} className={'w-full self-end'}>
          Details & Invest
          <ArrowRight className={'w-6 h-6'} />
        </AppLink>
      </CardFooter>
    </Card>
  )
}
