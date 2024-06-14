import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card.tsx';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils.ts';
import { ReactNode } from 'react';

interface AmountCardProps {
  amount: {
    title: string;
    number: string;
  };
  variant?: 'bordered';
  className?: string;
  children?: ReactNode;
}

export const AmountCard = (props: AmountCardProps) => {
  const { amount, variant, className, children } = props;
  const { title, number } = amount;

  const cardVariants = cva('', {
    variants: {
      variant: {
        bordered: 'border'
        // accent: 'bg-accent text-accent-foreground',
        // accentTeal: 'bg-accent-accentTeal text-accent-foreground',
        // accentGray: 'bg-accent-accentGray text-accent-foreground'
      }
    }
  });

  return (
    <Card className={cn(cardVariants({ variant, className }))}>
      <CardHeader>
        <CardTitle className={'font-bold text-lg'}>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <span className={'text-[2.5rem] font-roboto font-bold'}>{number}</span>
        {children}
      </CardContent>
    </Card>
  );
};
