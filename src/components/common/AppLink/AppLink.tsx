import { Link, LinkProps } from 'react-router-dom'
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils.ts';

interface AppLinkProps extends LinkProps {
  isActive?: boolean
  variant: 'solid' | 'ghost' | 'muted' | 'accent'
  className?: string
}

export const AppLink = (props: AppLinkProps) => {
  const {
    to,
    children,
    isActive = false,
    variant,
    className,
    ...otherProps
  } = props

  const linkVariants = cva(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 uppercase',
    {
      variants: {
        variant: {
          solid: "bg-primary text-primary-foreground hover:bg-primary/90 rounded-md h-10 px-4 py-2",
          accent: 'bg-accent text-primary-foreground hover:bg-blue-500/90 rounded-md h-10 px-4 py-2',
          ghost: `${isActive ? 'border-b-2 border-accent' : 'border-b-2 border-transparent'}`,
          muted: "bg-muted text-muted-foreground h-10 px-4 py-2 cursor-auto pointer-events-none"
        }
      },
    }
  )

  return (
    <Link to={to} className={cn(linkVariants({variant, className}))} {...otherProps}>
      {children}
    </Link>
  )
}