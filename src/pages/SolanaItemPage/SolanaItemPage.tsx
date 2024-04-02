import { PageHeader } from '@/components/common/PageHeader/PageHeader.tsx'
import { AmountCard } from '@/components/widgets/cards/AmountCard/AmountCard.tsx'
import { HoldingsCard } from '@/components/widgets/cards/HoldingsCard/HoldingsCard.tsx'
import { DescriptionCard } from '@/components/widgets/cards/DescritptionCard/DescriptionCard.tsx'
import { AssetsCard } from '@/components/widgets/cards/AssetsCard/AssetsCard.tsx'
import { InvestCard } from '@/components/widgets/cards/InvestCard/InvestCard.tsx'
import { PageTitle } from '@/components/common/PageTitle/PageTitle.tsx'
import { ClassicForm } from '@/components/features/forms/ClassicForm/ClassicForm.tsx'
import { Button } from '@/components/ui/Button.tsx'
// import { ArrowUpDown, Flame } from 'lucide-react'
import { BackLink } from '@/components/common/BackLink/BackLink.tsx'
import { useModalsContext } from '@/providers/ModalProvider/ModalProvider.tsx'
import { SolanaItemTable } from '@/components/features/tabels/SolanaItemTable/SolanaItemTable'


const SolanaItemPage = () => {
  const tempData = {
    amount: {
      title: 'Current Portfolio Price',
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
      text: `The Solana Ecosystem portfolio is tailored for enthusiasts who believe in the Solana network's potential. It comprises assets tied to the Solana ecosystem, providing investors with the opportunity to participate in the network's growth and development.`,
    },
  }
  const { setModalName } = useModalsContext()

  return (
    <div>
      <BackLink title={'My holdings'} path={'/my-holdings'} />
      <PageTitle title={'SOLANA ECOSYSTEM item'}>
        <div className={'flex gap-4'}>
          <Button className={'flex-1 gap-2'} variant={'accent'} onClick={() => setModalName('TRANSFER_NFT')}>
            {/* <ArrowUpDown className={'w-4 h-4'} /> */}
            Transfer
          </Button>
          <Button className={'flex-1 gap-2'} variant={'destructive'} onClick={() => setModalName('BURN_NFT')}>
            {/* <Flame className={'w-4 h-4'} /> */}
            Burn
          </Button>
        </div>
      </PageTitle>
      <PageHeader>
        <AmountCard className={'flex-1'} amount={tempData.amount} variant={'accentTeal'} >
          <div className={'mt-4 flex flex-col gap-1'}>
            <span className={'font-regular text-sm'}>Invested</span>
            <span className={'font-roboto font-medium'}>100000000</span>
          </div>
        </AmountCard>
        <HoldingsCard className={'flex-1'} holdings={tempData.holdings} progressVariant={'solana'} />
        <DescriptionCard className={'flex-1'} description={tempData.description} />
      </PageHeader>
      <div className={'flex gap-8 items-start'}>
        <AssetsCard className={'flex-1'}>
          <SolanaItemTable />
        </AssetsCard>
        <InvestCard className={'flex-2'}>
          <ClassicForm currenciesVariant={'solana'} />
        </InvestCard>
      </div>
    </div>
  )
}

export default SolanaItemPage
