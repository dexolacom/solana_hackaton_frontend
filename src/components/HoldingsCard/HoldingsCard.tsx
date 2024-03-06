import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card.tsx';
import { HoldingsCardProgress } from '@/components/HoldingsCardProgress/HoldingsCardProgress.tsx';
import { cn } from '@/lib/utils.ts';
import { cva } from 'class-variance-authority';

interface HoldingsCardProps {
  holdings: {
    title: string
  }
  variant?: 'bordered'
  className?: string
}

export const HoldingsCard = (props: HoldingsCardProps) => {
  const { holdings, className, variant } = props
  const { title } = holdings

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
        <HoldingsCardProgress/>
      </CardContent>
    </Card>
  )
}