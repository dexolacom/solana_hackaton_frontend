import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card.tsx';
import { cn } from '@/lib/utils.ts';
import { ReactNode } from 'react';
import investIcon from '@/assets/icons/invest.svg';

interface InvestCardProps {
  className?: string;
  children: ReactNode;
}

export const InvestCard = (props: InvestCardProps) => {
  const { className, children } = props;

  return (
    <Card className={cn('bg-card text-foreground w-[400px] font-semibold', className)}>
      <CardHeader>
        <CardTitle className={'flex gap-2 font-bold items-center'}>
          <img src={investIcon} className={'w-6 h-6 mt-[2px]'} />
          invest
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
