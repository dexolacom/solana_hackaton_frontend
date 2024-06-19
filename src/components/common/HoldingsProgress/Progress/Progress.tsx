import { cn } from '@/lib/utils.ts';

interface ProgressProps {
  percent: number | string;
  className?: string;
}

export const Progress = (props: ProgressProps) => {
  const { percent, className } = props;

  return <div role={'progressbar'} className={cn(`h-full grow`, className)} style={{ flexBasis: `${percent}%` }} />;
};
