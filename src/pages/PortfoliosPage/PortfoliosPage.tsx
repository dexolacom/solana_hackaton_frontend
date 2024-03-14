import { HomeCardsContainer } from '@/components/common/HomeCardsContainer/HomeCardsContainer.tsx'
import { AppLink } from '@/components/common/AppLink/AppLink.tsx'

export const PortfoliosPage = () => {
  return (
    <>
      <div className={'flex gap-4 mb-6'}>
        <AppLink to={'classic/1'} variant={'accent'}>
          Classic Item page (for test)
        </AppLink>
        <AppLink to={'classic-earn/2'} variant={'accent'}>
          Classic + Earn Item page (for test)
        </AppLink>
      </div>
      <HomeCardsContainer />
    </>
  )
}
