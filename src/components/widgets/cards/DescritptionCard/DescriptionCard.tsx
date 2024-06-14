import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card.tsx';
import { cn } from '@/lib/utils.ts';
import { cva } from 'class-variance-authority';
import descIcon from '@/assets/icons/desc.svg';

interface DescriptionCardProps {
  description: {
    title: string;
    text: string;
  };
  variant?: 'bordered';
  className?: string;
  withIcon?: boolean;
}

export const DescriptionCard = (props: DescriptionCardProps) => {
  const { description, className, variant, withIcon = true } = props;
  const { title, text } = description;

  const cardVariants = cva('', {
    variants: {
      variant: {
        bordered: 'border'
      }
    }
  });

  return (
    <Card className={cn(cardVariants({ variant, className }))}>
      <CardHeader className='mb-6'>
        <CardTitle className={'flex gap-2 items-center font-bold'}>
          {withIcon && <img src={descIcon} className={'w-6 h-6'} />}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className={'text-base font-medium'}>{text}</CardContent>
    </Card>
  );
};
