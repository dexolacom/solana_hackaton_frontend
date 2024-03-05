import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card.tsx';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils.ts';

interface AmountCardProps {
  amount: {
    title: string
    number: string
  }
  variant?: 'accent'
}

export const AmountCard = (props: AmountCardProps) => {
  const {amount, variant} = props
  const {title, number} = amount

  const cardVariants = cva('border', {
      variants: {
        variant: {
          accent: "bg-accent text-primary-foreground border-none",
        },
      },
    }
  )

  return (
    <Card className={cn(cardVariants({ variant }))}>
      <CardHeader>
        <CardTitle>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <span className={'text-4xl font-roboto font-medium'}>
          {number}
        </span>
      </CardContent>
    </Card>
  )
}