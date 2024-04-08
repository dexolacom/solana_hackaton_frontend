import { ReactNode } from 'react'
import { cn } from '@/lib/utils.ts'

export interface PageHeaderProps {
  children?: ReactNode
  className?: string
}

export const PageHeader = (props: PageHeaderProps) => {
  const { children, className } = props

  return <div className={cn('flex gap-8 mb-8', className)}>{children}</div>
}
