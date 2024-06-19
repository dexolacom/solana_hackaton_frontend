import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center border-none text-black rounded-sm px-3 py-1.5 text-xs font-medium capitalize transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        // default: 'bg-card border-2 border-accent text-accent',
        // low: 'bg-green-100 border-none',
        // medium: 'bg-yellow-100 border-none',
        // high: 'bg-rose-100 border-none',
        default: 'bg-black text-actions-foreground ',
        Low: 'bg-green-300',
        Medium: 'bg-blue-300',
        High: 'bg-orange-300'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
