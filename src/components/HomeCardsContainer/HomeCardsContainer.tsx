import { HomeCard } from '@/components/HomeCard/HomeCard.tsx';
import { cards } from '@/components/HomeCardsContainer/lib.ts';

export const HomeCardsContainer = () => {
  return (
    <div className={'grid grid-cols-3 gap-8'}>
      {cards.map((card, i) => {
        const {title, badges, content} = card;
        return (
          <HomeCard key={i} title={title} badges={badges} content={content}/>
        )
      })}
    </div>
  )
}