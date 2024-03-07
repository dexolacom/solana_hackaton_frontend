import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card.tsx';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils.ts';

interface AmountCardProps {
  amount: {
    title: string
    number: string
  }
  variant?: 'accent' | 'bordered'
  className?: string
}

export const AmountCard = (props: AmountCardProps) => {
  const {amount, variant, className} = props
  const {title, number} = amount

  const cardVariants = cva('', {
      variants: {
        variant: {
          bordered: "border",
          accent: "bg-accent text-primary-foreground border-none",
        },
      },
    }
  )

  return (
    <Card className={cn(cardVariants({ variant, className }))}>
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