import { Loader2 } from 'lucide-react';
export interface SkeletonProps {
  height?: number;
  width?: number;
  isLoader?: boolean;
}

export const Skeleton = (props: SkeletonProps) => {
  const { height, width, isLoader = true } = props;

  return (
    <div
      className={`animate-pulse bg-slate-200 rounded-md flex justify-center items-center`}
      style={{ height: `${height}px`, width: width ? `${width}px` : '100%' }}
    >
      {isLoader && <Loader2 size={80} className='animate-spin' />}
    </div>
  );
};
