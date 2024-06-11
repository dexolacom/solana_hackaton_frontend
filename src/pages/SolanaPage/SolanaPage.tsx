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
import { currencyFormatter } from '@/lib/utils'
// import { useTotalInvested } from '@/lib/blockchain/hooks/useTotalInvested'
// import { addressEcosystemCollection } from '@/lib/blockchain/constant'

const SolanaPage = () => {
  // const { data: ecosystemInvested, isLoading: isLoadingEcosystem } = useTotalInvested(addressEcosystemCollection);
  const ecosystemInvested = 0; 
  const isLoadingEcosystem = false; 

  const tempData = {
    amount: {
      title: 'Total amount invested',
      number: isLoadingEcosystem ? 'Calculation...' : currencyFormatter(ecosystemInvested ?? 0),
    },
    holdings: {
      title: 'Holdings',
      items: [
        {
          name: 'SOL',
          percent: 35,
        },
        {
          name: 'JUP',
          percent: 25,
        },
        {
          name: 'RNDR',
          percent: 20,
        },
        {
          name: 'HNT',
          percent: 20,
        },
        // {
        //   name: 'BONK',
        //   percent: 10,
        // },
        // {
        //   name: 'PYTH',
        //   percent: 5,
        // },
        // {
        //   name: 'RAY',
        //   percent: 5,
        // },
        // {
        //   name: 'JTO',
        //   percent: 5,
        // },
        // {
        //   name: 'WIF',
        //   percent: 5,
        // },
      ],
    },
    description: {
      title: 'Description',
      text: `The Solana Ecosystem portfolio is tailored for enthusiasts who believe in the Solana network's potential. It comprises assets tied to the Solana ecosystem, providing investors with the opportunity to participate in the network's growth and development.`,
    },
  }

  return (
    <div>
      <BackLink title={'Home'} path={'/'} />
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
