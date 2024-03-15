import { HomeCard } from '@/components/widgets/cards/HomeCard/HomeCard.tsx'
import { cards } from '@/components/common/HomeCardsContainer/lib.ts'

export const HomeCardsContainer = () => {
  return (
    <div className={'flex gap-4'}>
      {cards.map((card, i) => {
        const { title, badges, content, linkPath, buttonVariant } = card
        return (
          <HomeCard
            key={i}
            title={title}
            badges={badges}
            content={content}
            linkPath={linkPath}
            buttonVariant={buttonVariant as 'muted' | 'accent'}
          />
        )
      })}
    </div>
  )
}
