import { Progress } from '@/components/common/HoldingsProgress/Progress/Progress.tsx';
import { Holding } from '@/components/common/HoldingsProgress/Holding/Holding.tsx';
import { colors } from '@/components/common/HoldingsProgress/colors.ts';

interface HoldingsProgressProps {
  holdings: {
    name: string;
    percent: number | string;
  }[];
  progressVariant?: 'classic' | 'classicEarn' | 'solana' | 'all';
  withPercent: boolean;
  isProgress: boolean;
}

export const HoldingsProgress = (props: HoldingsProgressProps) => {
  const { holdings, progressVariant = 'classic', withPercent, isProgress } = props;
  const progressColors = colors[progressVariant];

  return (
    <div>
      {isProgress && (
        <div className={'relative h-14 w-full flex overflow-hidden gap-1 mb-4'}>
          {holdings.map((item, i) => (
            <Progress key={i} percent={item?.percent} className={progressColors[item?.name]} />
          ))}
        </div>
      )}
      <div className={`flex items-center ${isProgress ? 'gap-4' : 'gap-y-1'} flex-wrap`}>
        {holdings.map((item, i) => (
          <Holding
            key={i}
            title={item?.name}
            percent={item?.percent}
            className={progressColors[item?.name]}
            withPercent={withPercent}
            isProgress={isProgress}
          />
        ))}
      </div>
    </div>
  );
};
