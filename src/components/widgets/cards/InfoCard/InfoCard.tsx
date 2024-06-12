import { Card, CardContent } from '@/components/ui/Card.tsx';

interface InfoCardProps {
  data: {
    title: string;
    value: string;
  }[];
}

export const InfoCard = (props: InfoCardProps) => {
  const { data } = props;

  return (
    <Card className={'bg-card border text-foreground'}>
      <CardContent className={'flex flex-col gap-1'}></CardContent>
      {data.map((item, i) => (
        <div key={i} className={'flex items-center justify-between text-sm'}>
          <span className={'text-card-additionalForeground'}>{item?.title}</span>
          <span className={'font-roboto'}>{item?.value}</span>
        </div>
      ))}
    </Card>
  );
};
