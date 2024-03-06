import { Card, CardContent, CardTitle } from '@/components/ui/Card.tsx';
import { cn } from '@/lib/utils.ts';
import { cva } from 'class-variance-authority';

interface DescriptionCardProps {
  description: {
    title: string
    text: string
  }
  variant?: 'bordered'
  className?: string
}

export const DescriptionCard = (props:DescriptionCardProps) => {
  const { description, className, variant } = props
  const {title, text} = description

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
      <CardTitle>
        {title}
      </CardTitle>
      <CardContent>
        {text}
      </CardContent>
    </Card>
  )
}