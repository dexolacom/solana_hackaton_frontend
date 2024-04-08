import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center uppercase justify-center whitespace-nowrap rounded-md font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        accent: 'bg-actions text-actions-foreground hover:bg-slate-900/90',
        secondary: 'bg-slate-500 text-actions-foreground hover:bg-slate-500/90',
        destructive: 'bg-red-600 text-actions-foreground hover:bg-red-600/90',
        muted: 'bg-slate-200 text-foreground',
        ghost: 'bg-transparent hover:bg-blue-500/50',
        clear: 'bg-transparent',
      },
      size: {
        lg: 'h-11 px-8',
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3',
        icon: 'h-8 w-8',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, onClick, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} onClick={onClick} {...props} />
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
