import { AppLink } from '@/components/common/AppLink/AppLink.tsx';
import { ChevronLeft } from 'lucide-react';
import { ReactNode } from 'react';

interface PageTitleProps {
  children: ReactNode
}

export const PageTitle = (props: PageTitleProps) => {
  const { children } = props

  return (
    <div>
      <AppLink to={'/'} variant={'secondary'} className={'mb-8 gap-2 normal-case'}>
        <ChevronLeft className="h-5 w-5 mt-[2px]"/>
        Home page
      </AppLink>
      <h3 className={'text-3xl font-semibold mb-8'}>
        {children}
      </h3>
    </div>
  )
}