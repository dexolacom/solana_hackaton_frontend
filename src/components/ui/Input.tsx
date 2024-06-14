import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        `flex h-12 w-full border border-black text-foreground rounded-lg bg-card px-4 py-1 text-sm 
            file:border-0 file:bg-transparent file:text-sm
           file:font-medium placeholder:text-gray-400  focus-visible:outline-none
             focus:ring-offset-1 disabled:cursor-not-allowed
            disabled:opacity-50`,
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = 'Input';

export { Input };
