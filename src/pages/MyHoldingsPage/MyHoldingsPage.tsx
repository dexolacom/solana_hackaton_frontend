import { PageHeader } from '@/components/common/PageHeader/PageHeader.tsx'
import { HoldingsCard } from '@/components/widgets/cards/HoldingsCard/HoldingsCard.tsx'
import { AmountCard } from '@/components/widgets/cards/AmountCard/AmountCard.tsx'
import { InvestCard } from '@/components/widgets/cards/InvestCard/InvestCard.tsx'
import { HoldingsForm } from '@/components/features/forms/HoldingsForm/HoldingsForm.tsx'
import { NftCardsContainer } from '@/components/common/NftCardsContainer/NftCardsContainer.tsx'
import { MyHoldingsFilter } from '@/components/features/MyHoldingsFilter/MyHoldingsFilter.tsx'

const MyHoldingsPage = () => {
  const tempData = {
    amount: {
      title: 'Total amount invested',
      number: '$1,013,724.41',
    },
    holdings: {
      title: 'Holdings',
      items: [
        {
          name: 'SOL',
          percent: 30,
        },
        {
          name: 'JUP',
          percent: 15,
        },
        {
          name: 'RNDR',
          percent: 15,
        },
        {
          name: 'HNT',
          percent: 15,
        },
        {
          name: 'BONK',
          percent: 10,
        },
        {
          name: 'PYTH',
          percent: 5,
        },
        {
          name: 'RAY',
          percent: 5,
        },
        {
          name: 'JTO',
          percent: 5,
        },
        {
          name: 'WIF',
          percent: 5,
        },
      ],
    },
  }

  return (
    <div>
      <MyHoldingsFilter />
      <div className={'flex gap-8'}>
        <div>
          <PageHeader>
            <AmountCard className={'w-[35%]'} amount={tempData.amount} variant={'accentGray'}>
              <div className={'mt-4 flex flex-col gap-1'}>
                <span className={'font-regular text-sm'}>Invested</span>
                <span className={'font-roboto font-medium'}>100000000</span>
              </div>
            </AmountCard>
            <HoldingsCard className={'w-[65%]'} holdings={tempData.holdings} progressVariant={'solana'} />
          </PageHeader>

          <h3 className={'text-2xl font-semibold mb-8'}>NFT</h3>

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
