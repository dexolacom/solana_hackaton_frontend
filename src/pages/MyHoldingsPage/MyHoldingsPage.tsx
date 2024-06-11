import { useEffect } from 'react'
import { PageHeader } from '@/components/common/PageHeader/PageHeader.tsx'
import { HoldingsCard } from '@/components/widgets/cards/HoldingsCard/HoldingsCard.tsx'
import { AmountCard } from '@/components/widgets/cards/AmountCard/AmountCard.tsx'
import { InvestCard } from '@/components/widgets/cards/InvestCard/InvestCard.tsx'
import { HoldingsForm } from '@/components/features/forms/HoldingsForm/HoldingsForm.tsx'
import { NftCardsContainer } from '@/components/common/NftCardsContainer/NftCardsContainer.tsx'
import { MyHoldingsFilter } from '@/components/features/MyHoldingsFilter/MyHoldingsFilter.tsx'
import { currencyFormatter } from '@/lib/utils'
import { HoldingsFilterType } from '@/pages/MyHoldingsPage/lib/lib'
import { getHoldingPageData } from './lib/lib'
import { useSearchParams } from 'react-router-dom'
// import { useTotalInvested } from '@/lib/blockchain/hooks/useTotalInvested';
// import { addressClassicCollection } from '@/lib/blockchain/constant';
import { useNftData } from '@/lib/blockchain/hooks/useNftData'

export type AmountVariantType = 'accentGray' | 'accent' | 'accentTeal'


const MyHoldingsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { invested } = useNftData();

  const holdingsFilter = (searchParams.get('filter') ?? 'all') as HoldingsFilterType;

  useEffect(() => {
    setSearchParams({ filter: 'all' });
  }, [])

  // const { data: classicInvested, isLoading: isLoadingClassic } = useTotalInvested(addressClassicCollection);
  const classicInvested = 0;
  const isLoadingClassic = false;
  const ecosystemInvested = 0;
  const isLoadingEcosystem = false;

  // const { data: ecosystemInvested, isLoading: isLoadingEcosystem } = useTotalInvested(addressEcosystemCollection);
  // console.log("🚀 ~ MyHoldingsPage ~ ecosystemInvested:", ecosystemInvested)

  const data = getHoldingPageData({
    variant: holdingsFilter!,
    classicInvested,
    ecosystemInvested,
    isLoadingClassic,
    isLoadingEcosystem
  });

  return (
    <div>
      <MyHoldingsFilter setFilter={setSearchParams} />
      <div className={'flex gap-8'}>
        <div className='flex-1'>
          <PageHeader>
            <AmountCard className={'w-[35%]'} amount={data.amount} variant={data.amountCardVariant}>
              <div className={'mt-4 flex flex-col gap-1'}>
                <span className={'font-regular text-sm'}>Invested</span>
                <span className={'font-roboto font-medium'}>{currencyFormatter(invested[holdingsFilter])}</span>
              </div>
            </AmountCard>
            <HoldingsCard className={'flex-1'} holdings={data.holdings} progressVariant={data.progressVariant} withPercent={false} />
          </PageHeader>

          <h3 className={'text-2xl font-semibold mb-8'}>NFTs</h3>

          <NftCardsContainer />
        </div>

        <div className={'flex flex-col items-start'}>
          <InvestCard>
            <HoldingsForm />
          </InvestCard>
        </div>
      </div>
    </div>
  )
}


export default MyHoldingsPage
