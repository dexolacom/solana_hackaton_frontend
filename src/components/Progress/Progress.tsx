import { cn } from '@/lib/utils.ts';

interface ProgressProps {
  value: number
  className?: string
}

export const Progress = (props: ProgressProps) => {
  const {
    value,
    className
  } = props

  return (
    <div
      role={'progressbar'}
      className={cn(`h-full grow`, className)}
      style={{flexBasis: `${value}%`}}
    />
  )
}