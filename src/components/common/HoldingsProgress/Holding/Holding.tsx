import { cn } from '@/lib/utils.ts'
import { currencyIcons } from '@/lib/constants.tsx'

interface HoldingProps {
  title: string
  percent: number | string
  className?: string
  withIcons?: boolean
}

export const Holding = (props: HoldingProps) => {
  const { title, percent, className, withIcons = false } = props

  return (
    <div className={'flex gap-2 items-center uppercase text-sm'}>
      {withIcons ? (
        <img className={'h-6 w-6'} src={currencyIcons[title]} alt={'icon'} />
      ) : (
        <span className={cn('w-[12px] h-[12px] rounded-full -mt-[1px]', className)}></span>
      )}
      <span className={'flex items-baseline gap-2'}>
        <span>{title}</span>
        <span className={'font-roboto'}>{withIcons ? +percent * 100 : percent}%</span>
      </span>
    </div>
  )
}
