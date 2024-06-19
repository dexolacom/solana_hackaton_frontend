import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card.tsx';
import { HoldingsProgress } from '@/components/common/HoldingsProgress/HoldingsProgress.tsx';
import holdingsIcon from '@/assets/icons/holdings.svg';
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
  isProgress?: boolean;
}

export const HoldingsCard = (props: HoldingsCardProps) => {
  const { holdings, className, variant, progressVariant, withPercent = true, isProgress = true } = props;

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
      <CardHeader className={`${isProgress ? 'mb-6 justify-start' : 'mb-4'}`}>
        {isProgress && <img src={holdingsIcon} alt='Holdings icon' className='mr-2' />}
        <CardTitle className={`flex text-lg font-bold`}>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <HoldingsProgress
          holdings={items}
          progressVariant={progressVariant}
          withPercent={withPercent}
          isProgress={isProgress}
        />
      </CardContent>
    </Card>
  );
};
