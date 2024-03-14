import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card.tsx'
import { cn } from '@/lib/utils.ts'
import { cva } from 'class-variance-authority'
import descIcon from '@/assets/icons/desc.svg'

interface DescriptionCardProps {
  description: {
    title: string
    text: string
  }
  variant?: 'bordered'
  className?: string
  withIcon?: boolean
}

export const DescriptionCard = (props: DescriptionCardProps) => {
  const { description, className, variant, withIcon = true } = props
  const { title, text } = description

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
          {withIcon && <img src={descIcon} className={'w-4 h-4'} />}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className={'text-sm'}>{text}</CardContent>
    </Card>
  )
}
