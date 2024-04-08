import { HomeCard } from '@/components/widgets/cards/HomeCard/HomeCard.tsx'
import { getCardsData } from '@/components/common/HomeCardsContainer/lib.ts'
import { useProjectList } from '@/lib/api/hooks/useProjectList'
import { useTotalInvested } from '@/lib/blockchain/hooks/useTotalInvested';
import { addressClassicCollection } from '@/lib/blockchain/constant';

export const HomeCardsContainer = () => {

  const { projectList } = useProjectList();
  const { data, isLoading } = useTotalInvested(addressClassicCollection);
  console.log("🚀 ~ HomeCardsContainer ~ data:", data)
  const cards = getCardsData(projectList);
  
  
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
