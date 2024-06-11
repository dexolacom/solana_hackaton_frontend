import { HomeCard } from '@/components/widgets/cards/HomeCard/HomeCard.tsx'
import { getCardsData } from '@/components/common/HomeCardsContainer/lib.ts'
import { useProjectList } from '@/lib/api/hooks/useProjectList'
import { useTotalInvested } from '@/lib/blockchain/hooks/useTotalInvested';
import { 
  addressClassicCollection, 
  // addressEcosystemCollection 
} from '@/lib/blockchain/constant';

export const HomeCardsContainer = () => {

  const { projectList } = useProjectList();
  const { data: classicInvested, isLoading: isLoadingClassic } = useTotalInvested(addressClassicCollection);
  // const { data: ecosystemInvested, isLoading: isLoadingEcosystem } = useTotalInvested(addressEcosystemCollection);
  const ecosystemInvested = 0; 
  const isLoadingEcosystem = false; 
  // const classicInvested = 0; 
  // const isLoadingClassic = false; 
  const cards = getCardsData({projectList, classicInvested, ecosystemInvested, isLoadingClassic,  isLoadingEcosystem});
  
  return (
    <div className={'flex gap-4'}>
      {cards.map((card, i) => {
        const { title, badges, content, linkPath, buttonVariant, amountCardVariant, progressVariant } = card
        return (
          <HomeCard
            key={i}
            title={title}
            badges={badges}
            content={content}
            linkPath={linkPath}
            buttonVariant={buttonVariant as 'muted' | 'accent'}
            amountCardVariant={amountCardVariant as 'accent' | 'accentTeal' | 'accentGray'}
            progressVariant={progressVariant as 'classic' | 'classicEarn' | 'solana'}
          />
        )
      })}
    </div>
  )
}
