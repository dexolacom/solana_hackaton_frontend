import { PageTitle } from '@/components/common/PageTitle/PageTitle.tsx'
import { PageHeader } from '@/components/common/PageHeader/PageHeader.tsx'
import { AmountCard } from '@/components/widgets/cards/AmountCard/AmountCard.tsx'
import { HoldingsCard } from '@/components/widgets/cards/HoldingsCard/HoldingsCard.tsx'
import { DescriptionCard } from '@/components/widgets/cards/DescritptionCard/DescriptionCard.tsx'
import { AssetsCard } from '@/components/widgets/cards/AssetsCard/AssetsCard.tsx'
import { InvestCard } from '@/components/widgets/cards/InvestCard/InvestCard.tsx'
import { ClassicForm } from '@/components/features/forms/ClassicForm/ClassicForm.tsx'
import { ClassicEarnPageTable } from '@/components/features/tabels/ClassicEarnPageTable/ClassicEarnPageTable.tsx'
import { BackLink } from '@/components/common/BackLink/BackLink.tsx'

const tempData = {
  amount: {
    title: 'Total amount invested',
    number: '$1,013,724.41',
  },
  holdings: {
    title: 'Holdings',
    items: [
      {
        name: 'BTC',
        percent: 30,
      },
      {
        name: 'SOL',
        percent: 20,
      },
      {
        name: 'ETH',
        percent: 15,
      },
      {
        name: 'JUP',
        percent: 10,
      },
      {
        name: 'RNDR',
        percent: 10,
      },
      {
        name: 'HNT',
        percent: 5,
      },
      {
        name: 'BONK',
        percent: 5,
      },
      {
        name: 'PYTH',
        percent: 5,
      },
    ],
  },
  description: {
    title: 'Description',
    text: 'The Classic + Earn portfolio is a balanced investment strategy comprising a mix of low-risk and high-risk assets. It channels these assets into staking/landing/vaults for additional earning opportunities while aiming to optimize returns.',
  },
}

const ClassicEarnPage = () => {
  return (
    <div>
      <BackLink title={'Portfolios'} path={'/'} />
      <PageTitle title={'Classic + Earn'} isBadges />

      <PageHeader>
        <AmountCard className={'flex-1'} amount={tempData.amount} variant={'accentTeal'} />
        <HoldingsCard className={'flex-1'} holdings={tempData.holdings} progressVariant={'classicEarn'} />
        <DescriptionCard className={'flex-1'} description={tempData.description} />
      </PageHeader>

      <div className={'flex gap-8 items-start'}>
        <AssetsCard className={'flex-1'}>
          <ClassicEarnPageTable />
        </AssetsCard>
        <InvestCard className={'flex-2'}>
          <ClassicForm />
        </InvestCard>
      </div>
    </div>
  )
}

export default ClassicEarnPage
