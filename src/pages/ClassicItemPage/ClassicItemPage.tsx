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
import { ClassicItemTable } from '@/components/features/tabels/ClassicItemTable/ClassicItemTable.tsx'
import { useParams, useSearchParams } from 'react-router-dom'
import { currencyFormatter } from '@/lib/utils'
// import { useTotalInvested } from '@/lib/blockchain/hooks/useTotalInvested'
import { addressClassicCollection } from '@/lib/blockchain/constant'

const ClassicItemPage = () => {
  // const { data: classicInvested, isLoading: isLoadingClassic } = useTotalInvested(addressClassicCollection);
 
  const classicInvested = 0; 
  const isLoadingClassic = false; 
  const tempData = {
    amount: {
      title: 'Current Portfolio Price',
      number: isLoadingClassic ? 'Calculation...' : currencyFormatter(classicInvested ?? 0),
    },
    holdings: {
      title: 'Holdings',
      items: [
        {
          name: 'BTC',
          percent: 35,
        },
        {
          name: 'SOL',
          percent: 25,
        },
        {
          name: 'ETH',
          percent: 20,
        },
        {
          name: 'JUP',
          percent: 20,
        },
        // {
        //   name: 'RNDR',
        //   percent: 10,
        // },
        // {
        //   name: 'HNT',
        //   percent: 5,
        // },
        // {
        //   name: 'BONK',
        //   percent: 5,
        // },
        // {
        //   name: 'PYTH',
        //   percent: 5,
        // },
      ],
    },
    description: {
      title: 'Description',
      text: 'The Classic portfolio is a balanced investment strategy comprising a mix of low-risk and high-risk assets. With allocations across various cryptocurrencies, it aims to optimize returns while managing potential risks effectively.',
    },
  }
  const [searchParams] = useSearchParams();
  const { item } = useParams();
  const { setModalName, setNftPrice, setNftTitle, setCollection } = useModalsContext()
  const invested = searchParams.get('invested');
  const currentPrice = searchParams.get('currentPrice');

  return (
    <div>
      <BackLink title={'My holdings'} path={'/my-holdings'} />
      <PageTitle title={item ?? 'CLASSIC item'}>
        <div className={'flex gap-4'}>
          <Button className={'flex-1 gap-2'} variant={'accent'}
            onClick={() => {
              setModalName('TRANSFER_NFT');
              setNftTitle(item ?? '');
              setCollection(addressClassicCollection);
            }}>
            {/* <ArrowUpDown className={'w-4 h-4'} /> */}
            Transfer
          </Button>
          <Button className={'flex-1 gap-2'} variant={'destructive'}
            onClick={() => {
              setModalName('BURN_NFT');
              setNftPrice(currentPrice ? currentPrice.toString() : '0');
              setNftTitle(item ?? '');
              setCollection(addressClassicCollection);
            }}>
            {/* <Flame className={'w-4 h-4'} /> */}
            Burn
          </Button>
        </div>
      </PageTitle>
      <PageHeader>
        <AmountCard className={'flex-1'} amount={tempData.amount} variant={'accent'} >
          <div className={'mt-4 flex flex-col gap-1'}>
            <span className={'font-regular text-sm'}>Invested</span>
            <span className={'font-roboto font-medium'}>{currencyFormatter(invested ? +invested : 0)}</span>
          </div>
        </AmountCard>
        <HoldingsCard className={'flex-1'} holdings={tempData.holdings} progressVariant={'classic'} />
        <DescriptionCard className={'flex-1'} description={tempData.description} />
      </PageHeader>
      <div className={'flex gap-8 items-start'}>
        <AssetsCard className={'flex-1'}>
          <ClassicItemTable />
        </AssetsCard>
        <InvestCard className={'flex-2'}>
          <ClassicForm />
        </InvestCard>
      </div>
    </div>
  )
}

export default ClassicItemPage
