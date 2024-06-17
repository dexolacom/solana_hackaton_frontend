import { Card, CardContent } from '@/components/ui/Card.tsx';

interface InfoCardProps {
  data: {
    title: string;
    value: string;
  }[];
}

export const FeeCard = (props: InfoCardProps) => {
  const { data } = props;

  return (
    <Card className={'bg-card border text-foreground p-4'}>
      <CardContent className={'flex flex-col gap-1'}></CardContent>
      {data.map((item, i) => (
        <div key={i} className={'flex items-center justify-between text-sm'}>
          <span className={'text-card-additionalForeground font-regular'}>{item?.title}</span>
          <span className={'font-roboto font-medium'}>{item?.value}</span>
        </div>
      ))}
    </Card>
  );
};
