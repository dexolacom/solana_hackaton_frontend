import { Link, LinkProps } from 'react-router-dom';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils.ts';

interface AppLinkProps extends LinkProps {
  isActive?: boolean;
  variant: 'ghost' | 'muted' | 'accent' | 'disabled';
  className?: string;
}

export const AppLink = (props: AppLinkProps) => {
  const { to, children, isActive = false, variant, className, ...otherProps } = props;

  const linkVariants = cva(
    'inline-flex items-center justify-center gap-2 px-4 py-2 whitespace-nowrap font-kanit text-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 uppercase',
    {
      variants: {
        variant: {
          accent: 'bg-black text-actions-foreground hover:bg-indigo-950 rounded-lg h-12 px-4 py-2',
          ghost: `${isActive ? 'border-b-2 border-black' : 'border-b-2 border-transparent'}`,
          disabled: 'text-muted-foreground cursor-auto pointer-events-none',
          muted:
            'text-disabled-foreground cursor-auto pointer-events-none bg-muted-background rounded-lg h-12 px-4 py-2'
        }
      }
    }
  );

  return (
    <Link to={to} className={cn(linkVariants({ variant, className }))} {...otherProps}>
      {children}
    </Link>
  );
};
