import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card.tsx'
import { cn } from '@/lib/utils.ts'
import { ReactNode } from 'react'
import investIcon from '@/assets/icons/invest.svg'

interface InvestCardProps {
  className?: string
  children: ReactNode
}

export const InvestCard = (props: InvestCardProps) => {
  const { className, children } = props

  return (
    <Card className={cn('bg-card text-foreground w-[400px] font-regular', className)}>
      <CardHeader>
        <CardTitle className={'flex gap-2'}>
          <img src={investIcon} className={'w-4 h-4 mt-[2px]'} />
          invest
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}
