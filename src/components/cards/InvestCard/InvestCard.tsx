import { Card, CardHeader, CardTitle } from '@/components/ui/Card.tsx';
import { cn } from '@/lib/utils.ts';

interface InvestCardProps {
  className?: string
}


export const InvestCard = (props: InvestCardProps) => {
  const {
    className
  } = props

  return (
    <Card className={cn('bg-primary text-primary-foreground', className)}>
      <CardHeader>
        <CardTitle>
          invest
        </CardTitle>
      </CardHeader>
    </Card>
  )
}