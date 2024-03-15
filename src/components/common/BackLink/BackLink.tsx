import { ChevronLeft } from 'lucide-react'
import { AppLink } from '@/components/common/AppLink/AppLink.tsx'

interface BackLinkProps {
  title: string
  path: string
}

export const BackLink = (props: BackLinkProps) => {
  const { path, title } = props

  return (
    <AppLink to={path} variant={'ghost'} className={'mb-8 gap-2 normal-case'}>
      <ChevronLeft className="h-5 w-5 mt-[2px]" />
      {title}
    </AppLink>
  )
}
