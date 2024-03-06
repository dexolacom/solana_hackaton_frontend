import { Progress } from '@/components/common/HoldingsProgress/Progress/Progress.tsx';
import { Holding } from '@/components/common/HoldingsProgress/Holding/Holding.tsx';

interface HoldingsProgressProps {
  holdings: {
    name: string
    percent: number | string
  }[]
}

export const HoldingsProgress = (props: HoldingsProgressProps) => {
  const { holdings } = props
  const progressColors: Record<string, string> = {
    'BTC': 'bg-blue-900',
    'SOL': 'bg-blue-800',
    'ETH': 'bg-blue-700',
    'JUP': 'bg-blue-600',
    'RNDR': 'bg-blue-500',
    'HNT': 'bg-blue-400',
    'BONK': 'bg-blue-300',
    'PYTH': 'bg-blue-200',
    'RAY': 'bg-sky-900',
    'JTO': 'bg-sky-800',
    'WIF': 'bg-sky-700',
  }

  return (
    <div>
      <div className={'relative h-7 w-full flex overflow-hidden rounded-md gap-1 mb-4'}>
        {holdings.map((item, i) => (
          <Progress key={i} percent={item?.percent} className={progressColors[item?.name]}/>
        ))}
      </div>
      <div className={'flex items-center gap-4 flex-wrap'}>
        {holdings.map((item, i) => (
          <Holding key={i} name={item?.name} percent={item?.percent} className={progressColors[item?.name]}/>
        ))}
      </div>
    </div>

  )
}