import { Loader2 } from 'lucide-react';
export interface SkeletonProps {
  height?: number;
}

export const Skeleton = (props: SkeletonProps) => {
  const { height } = props;

  return (
    <div
      className={`animate-pulse w-full bg-slate-200 rounded-md flex justify-center items-center`}
      style={{ height: `${height}px` }}
    >
      <Loader2 size={80} className='animate-spin' />
    </div>
  );
};
