import { Progress } from '@/components/common/HoldingsProgress/Progress/Progress.tsx'
import { Holding } from '@/components/common/HoldingsProgress/Holding/Holding.tsx'

interface HoldingsProgressProps {
  holdings: {
    name: string
    percent: number | string
  }[]
}

export const HoldingsProgress = (props: HoldingsProgressProps) => {
  const { holdings } = props
  const progressColors: Record<string, string> = {
    BTC: 'bg-blue-700/90',
    SOL: 'bg-blue-700/75',
    ETH: 'bg-blue-700/50',
    JUP: 'bg-blue-600',
    RNDR: 'bg-blue-600/90',
    HNT: 'bg-blue-600/75',
    BONK: 'bg-blue-600/50',
    PYTH: 'bg-blue-500',
    RAY: 'bg-blue-500/90',
    JTO: 'bg-blue-500/75',
    WIF: 'bg-blue-500/50',
  }

  return (
    <div>
      <div className={'relative h-7 w-full flex overflow-hidden rounded-md gap-1 mb-4'}>
        {holdings.map((item, i) => (
          <Progress key={i} percent={item?.percent} className={progressColors[item?.name]} />
        ))}
      </div>
      <div className={'flex items-center gap-4 flex-wrap'}>
        {holdings.map((item, i) => (
          <Holding key={i} name={item?.name} percent={item?.percent} className={progressColors[item?.name]} />
        ))}
      </div>
    </div>
  )
}
