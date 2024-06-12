import { cn } from '@/lib/utils.ts';

interface HoldingProps {
  title: string;
  percent: number | string;
  className?: string;
  withPercent?: boolean;
}

export const Holding = (props: HoldingProps) => {
  const { title, percent, className, withPercent } = props;

  return (
    <div className={'flex gap-2 items-center uppercase text-sm'}>
      <span className={cn('w-[12px] h-[12px] rounded-full -mt-[1px]', className)}></span>
      <span className={'flex items-baseline gap-2'}>
        <span>{title}</span>
        {withPercent && <span className={'font-roboto'}>{percent}%</span>}
      </span>
    </div>
  );
};
