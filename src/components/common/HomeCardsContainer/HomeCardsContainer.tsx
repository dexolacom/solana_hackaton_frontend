import { forwardRef } from 'react';
import { getCardsData } from '@/components/common/HomeCardsContainer/lib.ts';
import { useProjectList } from '@/lib/api/hooks/useProjectList';
import { useTotalInvested } from '@/lib/blockchain/hooks/useTotalInvested';
import {
  addressClassicCollection
  // addressEcosystemCollection
} from '@/lib/blockchain/constant';
import { PortfolioCard } from '@/components/widgets/cards/PortfolioCard/PortfolioCard';

interface HomeCardsContainerProps {
  ref: React.RefObject<HTMLDivElement>;
}

export const HomeCardsContainer = forwardRef<HTMLDivElement, HomeCardsContainerProps>((_, ref) => {
  const { projectList } = useProjectList();
  const { data: classicInvested, isLoading: isLoadingClassic } = useTotalInvested(addressClassicCollection);
  const ecosystemInvested = 0;
  const isLoadingEcosystem = false;
  const cards = getCardsData({ projectList, classicInvested, ecosystemInvested, isLoadingClassic, isLoadingEcosystem });

  return (
    <section ref={ref}>
      <h2 className='text-8xl uppercase font-semibold text-center mb-20'>Portfolios</h2>
      <div className={'flex gap-10'}>
        {cards.map((card, i) => {
          const { title, badges, content, linkPath, buttonVariant, progressVariant, backgroundImage, amountVariant } =
            card;
          return (
            <PortfolioCard
              key={i}
              title={title}
              badges={badges}
              content={content}
              linkPath={linkPath}
              buttonVariant={buttonVariant as 'muted' | 'accent'}
              progressVariant={progressVariant as 'classic' | 'classicEarn' | 'solana'}
              backgroundImage={backgroundImage}
              amountCardVariant={amountVariant as 'bordered'}
            />
          );
        })}
      </div>
    </section>
  );
});
