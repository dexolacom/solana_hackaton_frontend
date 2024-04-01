import { PageHeader } from '@/components/common/PageHeader/PageHeader.tsx'
import { AmountCard } from '@/components/widgets/cards/AmountCard/AmountCard.tsx'
import { HoldingsCard } from '@/components/widgets/cards/HoldingsCard/HoldingsCard.tsx'
import { DescriptionCard } from '@/components/widgets/cards/DescritptionCard/DescriptionCard.tsx'
import { AssetsCard } from '@/components/widgets/cards/AssetsCard/AssetsCard.tsx'
import { InvestCard } from '@/components/widgets/cards/InvestCard/InvestCard.tsx'
import { PageTitle } from '@/components/common/PageTitle/PageTitle.tsx'
import { ClassicForm } from '@/components/features/forms/ClassicForm/ClassicForm.tsx'
import { BackLink } from '@/components/common/BackLink/BackLink.tsx'
import { SolanaPageTable } from '@/components/features/tabels/SolanaPageTable/SolanaPageTable.tsx'

const SolanaPage = () => {
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
    description: {
      title: 'Description',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    },
  }

  return (
    <div>
      <BackLink title={'Portfolios'} path={'/'} />
      <PageTitle title={'solana ecosystem'} />
      <PageHeader>
        <AmountCard className={'flex-1'} amount={tempData.amount} variant={'accentTeal'} />
        <HoldingsCard className={'flex-1'} holdings={tempData.holdings} progressVariant={'solana'} />
        <DescriptionCard className={'flex-1'} description={tempData.description} />
      </PageHeader>
      <div className={'flex gap-8 items-start'}>
        <AssetsCard className={'flex-1'}>
          <SolanaPageTable />
        </AssetsCard>
        <InvestCard className={'flex-2'}>
          <ClassicForm currenciesVariant={'solana'} />
        </InvestCard>
      </div>
    </div>
  )
}

export default SolanaPage
