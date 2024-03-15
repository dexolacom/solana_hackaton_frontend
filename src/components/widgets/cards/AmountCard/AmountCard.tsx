import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card.tsx'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils.ts'
import { ReactNode } from 'react'

interface AmountCardProps {
  amount: {
    title: string
    number: string
  }
  variant?: 'accent' | 'bordered' | 'accentTeal' | 'accentGray'
  className?: string
  children?: ReactNode
}

export const AmountCard = (props: AmountCardProps) => {
  const { amount, variant, className, children } = props
  const { title, number } = amount

  const cardVariants = cva('border-none', {
    variants: {
      variant: {
        bordered: 'border',
        accent: 'bg-accent text-accent-foreground',
        accentTeal: 'bg-accent-accentTeal text-accent-foreground',
        accentGray: 'bg-accent-accentGray text-accent-foreground',
      },
    },
  })

  return (
    <Card className={cn(cardVariants({ variant, className }))}>
      <CardHeader>
        <CardTitle className={'font-semibold'}>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <span className={'text-4xl font-roboto font-medium'}>{number}</span>
        {children}
      </CardContent>
    </Card>
  )
}
