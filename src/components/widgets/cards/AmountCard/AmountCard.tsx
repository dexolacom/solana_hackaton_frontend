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
  headerVariant?: 'portfolio' | 'holdings';
  descriptionVariant?: 'portfolio';
  className?: string;
  children?: ReactNode;
}

export const AmountCard = (props: AmountCardProps) => {
  const { amount, variant, headerVariant, descriptionVariant, className, children } = props;
  const { title, number } = amount;

  const cardVariants = cva('bg-inherit p-0', {
    variants: {
      variant: {
        bordered: 'border p-6'
        // accent: 'bg-accent text-accent-foreground',
        // accentTeal: 'bg-accent-accentTeal text-accent-foreground',
        // accentGray: 'bg-accent-accentGray text-accent-foreground'
      }
    }
  });

  const headerVariants = cva('font-bold text-lg', {
    variants: {
      variant: {
        portfolio: 'm-0 text-base font-semibold',
        holdings: 'mb-4 text-base'
      }
    }
  });

  const descriptionVariants = cva('text-3xl font-roboto font-bold 1920:text-[2.5rem]', {
    variants: {
      variant: {
        portfolio: 'm-0 text-m text-4xl'
      }
    }
  });

  return (
    <Card className={cn(cardVariants({ variant, className }))}>
      <CardHeader className={cn(headerVariants({ variant: headerVariant }))}>
        <CardTitle className={`${headerVariant === 'holdings' && 'font-bold'}`}>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <span className={cn(descriptionVariants({ variant: descriptionVariant }))}>{number}</span>
      </CardContent>
      {children}
    </Card>
  );
};
