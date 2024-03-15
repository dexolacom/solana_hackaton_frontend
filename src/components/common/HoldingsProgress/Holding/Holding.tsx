import { cn } from '@/lib/utils.ts'

interface HoldingProps {
  name: string
  percent: number | string
  className?: string
}

export const Holding = (props: HoldingProps) => {
  const { name, percent, className } = props

  return (
    <div className={'flex gap-2 items-center uppercase text-sm'}>
      <span className={cn('w-[12px] h-[12px] rounded-full', className)}></span>
      <span>{name}</span>
      <span>{percent}%</span>
    </div>
  )
}
