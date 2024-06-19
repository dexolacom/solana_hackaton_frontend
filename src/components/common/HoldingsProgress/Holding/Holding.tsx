import { cn } from '@/lib/utils.ts';

interface HoldingProps {
  title: string;
  percent: number | string;
  className?: string;
  withPercent: boolean;
  isProgress: boolean;
}

export const Holding = (props: HoldingProps) => {
  const { title, percent, className, withPercent, isProgress } = props;

  return (
    <div className={`flex ${isProgress ? 'gap-2' : 'basis-1/3'} items-center uppercase text-m`}>
      {isProgress && <span className={cn('w-[12px] h-[12px] rounded-full -mt-[1px]', className)}></span>}
      <span className={'flex items-baseline gap-2'}>
        <span className='font-bold'>{title}</span>
        {withPercent && <span className={'font-roboto'}>{percent}%</span>}
      </span>
    </div>
  );
};
