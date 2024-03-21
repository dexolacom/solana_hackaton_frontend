import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card.tsx'
import { HoldingsProgress } from '@/components/common/HoldingsProgress/HoldingsProgress.tsx'
import { cn } from '@/lib/utils.ts'
import { cva } from 'class-variance-authority'
import holdingsIcon from '@/assets/icons/holdings.svg'
import { HoldingCurrencies } from '@/components/common/HoldingsCurrencies/HoldingCurrencies.tsx'

interface HoldingsCardProps {
  holdings: {
    title: string
    items: {
      name: string
      percent: string | number
    }[]
  }
  variant?: 'bordered'
  className?: string
  withIcon?: boolean
  progressVariant?: 'classic' | 'classicEarn' | 'solana'
  withCurrencies?: boolean
}

export const HoldingsCard = (props: HoldingsCardProps) => {
  const { holdings, className, variant, withIcon = true, progressVariant, withCurrencies = false } = props

  const { title, items } = holdings

  const cardVariants = cva('', {
    variants: {
      variant: {
        bordered: 'border',
      },
    },
  })

  return (
    <Card className={cn(cardVariants({ variant, className }))}>
      <CardHeader>
        <CardTitle className={'flex gap-2'}>
          {withIcon && <img src={holdingsIcon} className={'w-4 h-4'} />}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {withCurrencies ? (
          <HoldingCurrencies />
        ) : (
          <HoldingsProgress holdings={items} progressVariant={progressVariant} />
        )}
      </CardContent>
    </Card>
  )
}
