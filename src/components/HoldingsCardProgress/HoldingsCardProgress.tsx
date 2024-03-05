import { Progress } from '@/components/Progress/Progress.tsx';

export const HoldingsCardProgress = () => {
  return (
    <div className={'relative h-7 w-full flex overflow-hidden rounded-md gap-1'}>
      <Progress value={55} className={'bg-accent'}/>
      <Progress value={16} className={'bg-blue-500'}/>
      <Progress value={33} className={'bg-blue-400'}/>
      <Progress value={20} className={'bg-blue-600'}/>
      <Progress value={10} className={'bg-accent'}/>
    </div>
  )
}