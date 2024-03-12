import { Card, CardContent } from '@/components/ui/Card.tsx';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils.ts';

interface InfoCardProps {
  data: {
    title: string
    number: string
  }[]
  variant: 'default' | 'dark'
}

export const InfoCard = (props: InfoCardProps) => {
  const { data, variant } = props

  const cardVariants = cva(
    'p-4',
    {
      variants: {
        variant: {
          'default': 'bg-card border text-foreground',
          'dark': 'bg-slate-500 text-primary-foreground'
        }
      }
    }
  )

  return (
    <Card className={cn(cardVariants({variant}))}>
      <CardContent className={'flex flex-col gap-1'}>
        {data.map((item, i) => (
          <div key={i} className={'flex items-center justify-between text-sm'}>
            <span className={
              variant === 'dark'
                ? 'text-secondary-additionalForeground'
                : 'text-card-additionalForeground'
            }>
              {item?.title}
            </span>
            <span className={'font-medium'}>{item?.number}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}