import { ReactNode } from 'react';

export interface PageHeaderProps {
  children?: ReactNode
}

export const PageHeader = (props: PageHeaderProps) => {
  const {
    children
  } = props

  return (
    <div className={'flex gap-8 mb-8'}>
      {children}
    </div>
  )
}