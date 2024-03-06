import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card.tsx';
import { HoldingsProgress } from '@/components/common/HoldingsProgress/HoldingsProgress.tsx';
import { cn } from '@/lib/utils.ts';
import { cva } from 'class-variance-authority';

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
}

export const HoldingsCard = (props: HoldingsCardProps) => {
  const { holdings, className, variant } = props
  const { title, items } = holdings

  const cardVariants = cva('', {
      variants: {
        variant: {
          bordered: "border",
        },
      },
    }
  )

  return (
    <Card className={cn(cardVariants({ variant, className }))}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <HoldingsProgress holdings={items}/>
      </CardContent>
    </Card>
  )
}