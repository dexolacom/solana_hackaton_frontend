import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card.tsx';
import { HoldingsProgress } from '@/components/common/HoldingsProgress/HoldingsProgress.tsx';
import { cn } from '@/lib/utils.ts';
import { cva } from 'class-variance-authority';

interface HoldingsCardProps {
  holdings: {
    title: string;
    items: {
      name: string;
      percent: string | number;
    }[];
  };
  variant?: 'bordered';
  className?: string;
  progressVariant?: 'classic' | 'classicEarn' | 'solana' | 'all';
  withPercent?: boolean;
}

export const HoldingsCard = (props: HoldingsCardProps) => {
  const { holdings, className, variant, progressVariant, withPercent = true } = props;

  const { title, items } = holdings;

  const cardVariants = cva('', {
    variants: {
      variant: {
        bordered: 'border'
      }
    }
  });

  return (
    <Card className={cn(cardVariants({ variant, className }))}>
      <CardHeader>
        <CardTitle className={'flex gap-2'}>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <HoldingsProgress holdings={items} progressVariant={progressVariant} withPercent={withPercent} />
      </CardContent>
    </Card>
  );
};
