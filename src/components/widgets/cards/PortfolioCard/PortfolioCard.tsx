import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card.tsx';
import { Badge } from '@/components/ui/Badge.tsx';
import { AmountCard } from '@/components/widgets/cards/AmountCard/AmountCard.tsx';
import { HoldingsCard } from '@/components/widgets/cards/HoldingsCard/HoldingsCard.tsx';
import { AppLink } from '@/components/common/AppLink/AppLink.tsx';
import { ArrowRight } from 'lucide-react';

export interface PortfolioCardProps {
  title: string;
  backgroundImage: string;
  content: {
    amount: {
      title: string;
      number: string;
    };
    holdings: {
      title: string;
      items: {
        name: string;
        percent: string | number;
      }[];
    };
  };
  linkPath: string;
  buttonVariant: 'muted' | 'accent';
  progressVariant: 'classic' | 'classicEarn' | 'solana';
  amountCardVariant?: 'bordered';
  badges?: string[];
}

export const PortfolioCard = (props: PortfolioCardProps) => {
  const { title, badges, content, linkPath, buttonVariant, amountCardVariant, progressVariant, backgroundImage } =
    props;
  const { amount, holdings } = content;

  return (
    <Card className='flex-1 p-0 shadow-[0px_4px_16px_8px_rgba(0,0,0,0.02)]'>
      <CardHeader
        className={`mb-0 bg-cover h-[227px] rounded-lg px-6 py-10 items-start flex-col justify-start gap-4`}
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      >
        <CardTitle className={'text-2xl font-semibold'}>{title}</CardTitle>
        <span className={'flex gap-2'}>{badges?.map((badge, i) => <Badge key={i}>{badge}</Badge>)}</span>
      </CardHeader>
      <CardContent className={'flex flex-col gap-4 p-6'}>
        <AmountCard amount={amount} variant={amountCardVariant} />
        <HoldingsCard variant={'bordered'} holdings={holdings} progressVariant={progressVariant} isProgress={false} />
      </CardContent>
      <CardFooter className={'pb-10 px-6'}>
        <AppLink to={linkPath} variant={buttonVariant} className={'w-full self-end'}>
          Details & Invest
          <ArrowRight className={'w-6 h-6'} />
        </AppLink>
      </CardFooter>
    </Card>
  );
};
