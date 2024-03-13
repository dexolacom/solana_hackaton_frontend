import { ReactNode } from 'react';
import { Badge } from '@/components/ui/Badge.tsx';

interface PageTitleProps {
  title: string
  children?: ReactNode
  isBadges?: boolean
}

const badges = ['landing', 'staking', 'vaults' ]

export const PageTitle = (props: PageTitleProps) => {
  const { children, title, isBadges = false} = props

  return (
    <div className={'flex items-center justify-between mb-8'}>
      <div className={'flex gap-4 items-center'}>
        <h3 className={'text-2xl font-semibold uppercase'}>
          {title}
        </h3>
        {isBadges &&
          <span className={'flex gap-2'}>
            {badges?.map((badge, i) => (
              <Badge key={i}>
                {badge}
              </Badge>
            ))}
          </span>
        }
      </div>

      <div>
        {children}
      </div>
    </div>
  )
}