export interface SkeletonProps {
  height?: number
}

export const Skeleton = (props: SkeletonProps) => {
  const { height } = props

  return <div className={`animate-pulse w-full bg-slate-200 rounded-md`} style={{ height: `${height}px` }} />
}
