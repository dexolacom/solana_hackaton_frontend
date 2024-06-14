import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card.tsx';
import { ReactNode } from 'react';
import assetsIcon from '@/assets/icons/assets.svg';

interface AssetsCardProps {
  className?: string;
  children: ReactNode;
}

export const AssetsCard = (props: AssetsCardProps) => {
  const { className, children } = props;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className={'flex gap-2 items-center font-bold text-base'}>
          <img src={assetsIcon} className={'w-6 h-6'} />
          assets
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
