import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card.tsx';
import { cn } from '@/lib/utils.ts';
import { ReactNode } from 'react';

interface InvestCardProps {
  className?: string
  children: ReactNode
}

export const InvestCard = (props: InvestCardProps) => {
  const { className, children } = props

  return (
    <Card className={cn('bg-secondary text-secondary-foreground w-[400px] font-regular', className)}>
      <CardHeader>
        <CardTitle>
          invest
        </CardTitle>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  )
}