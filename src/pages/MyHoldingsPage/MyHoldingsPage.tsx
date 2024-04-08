import { useEffect } from 'react'
import { PageHeader } from '@/components/common/PageHeader/PageHeader.tsx'
import { HoldingsCard } from '@/components/widgets/cards/HoldingsCard/HoldingsCard.tsx'
import { AmountCard } from '@/components/widgets/cards/AmountCard/AmountCard.tsx'
import { InvestCard } from '@/components/widgets/cards/InvestCard/InvestCard.tsx'
import { HoldingsForm } from '@/components/features/forms/HoldingsForm/HoldingsForm.tsx'
import { NftCardsContainer } from '@/components/common/NftCardsContainer/NftCardsContainer.tsx'
import { MyHoldingsFilter } from '@/components/features/MyHoldingsFilter/MyHoldingsFilter.tsx'
import { useAppContext } from '@/providers/AppProvider/AppProvider'
import { currencyFormatter } from '@/lib/utils'
import { HoldingsFilterType } from '@/pages/MyHoldingsPage/lib/lib'
import { getHoldingPageData } from './lib/lib'
import { useSearchParams } from 'react-router-dom'

export type AmountVariantType = 'accentGray' | 'accent' | 'accentTeal'


const MyHoldingsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { invested } = useAppContext();

  const holdingsFilter = (searchParams.get('filter') ?? 'all') as HoldingsFilterType;

  useEffect(() => {
    setSearchParams({ filter: 'all' });
  },[])
 

  const data = getHoldingPageData(holdingsFilter!);

  return (
    <div>
      <MyHoldingsFilter setFilter={setSearchParams} />
      <div className={'flex gap-8'}>
        <div className='flex-1'>
          <PageHeader>
            <AmountCard className={'w-[35%]'} amount={data.amount} variant={data.amountCardVariant}>
              <div className={'mt-4 flex flex-col gap-1'}>
                <span className={'font-regular text-sm'}>Invested</span>
                <span className={'font-roboto font-medium'}>{currencyFormatter(invested)}</span>
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
