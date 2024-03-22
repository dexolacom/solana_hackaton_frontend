import { Progress } from '@/components/common/HoldingsProgress/Progress/Progress.tsx'
import { Holding } from '@/components/common/HoldingsProgress/Holding/Holding.tsx'
import { colors } from '@/components/common/HoldingsProgress/colors.ts'

interface HoldingsProgressProps {
  holdings: {
    name: string
    percent: number | string
  }[]
  progressVariant?: 'classic' | 'classicEarn' | 'solana'
}

export const HoldingsProgress = (props: HoldingsProgressProps) => {
  const { holdings, progressVariant = 'classic' } = props
  const progressColors = colors[progressVariant]

  return (
    <div>
      <div className={'relative h-7 w-full flex overflow-hidden rounded-md gap-1 mb-4'}>
        {holdings.map((item, i) => (
          <Progress key={i} percent={item?.percent} className={progressColors[item?.name]} />
        ))}
      </div>
      <div className={'flex items-center gap-4 flex-wrap'}>
        {holdings.map((item, i) => (
          <Holding key={i} title={item?.name} percent={item?.percent} className={progressColors[item?.name]} />
        ))}
      </div>
    </div>
  )
}
