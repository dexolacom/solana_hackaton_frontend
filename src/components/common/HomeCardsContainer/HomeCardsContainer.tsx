import { HomeCard } from '@/components/widgets/cards/HomeCard/HomeCard.tsx';
import { cards } from '@/components/common/HomeCardsContainer/lib.ts';

export const HomeCardsContainer = () => {
  return (
    <div className={'grid grid-cols-3 gap-8'}>
      {cards.map((card, i) => {
        const {title, badges, content, linkPath} = card;
        return (
          <HomeCard key={i} title={title} badges={badges} content={content} linkPath={linkPath}/>
        )
      })}
    </div>
  )
}