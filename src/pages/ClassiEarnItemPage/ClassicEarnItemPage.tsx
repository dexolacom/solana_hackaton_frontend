import { PageTitle } from '@/components/common/PageTitle/PageTitle.tsx';
import { PageHeader } from '@/components/common/PageHeader/PageHeader.tsx';
import { AmountCard } from '@/components/widgets/cards/AmountCard/AmountCard.tsx';
import { HoldingsCard } from '@/components/widgets/cards/HoldingsCard/HoldingsCard.tsx';
import { DescriptionCard } from '@/components/widgets/cards/DescritptionCard/DescriptionCard.tsx';
import { AssetsCard } from '@/components/widgets/cards/AssetsCard/AssetsCard.tsx';
import { InvestCard } from '@/components/widgets/cards/InvestCard/InvestCard.tsx';
import { ClassicForm } from '@/components/widgets/ClassicForm/ClassicForm.tsx';
import { BackLink } from '@/components/common/BackLink/BackLink.tsx';
import { Button } from '@/components/ui/Button.tsx';
import { ArrowUpDown, Flame } from 'lucide-react';
import { useModalsContext } from '@/providers/ModalProvider/ModalProvider.tsx';

const tempData = {
  amount: {
    title: 'Total amount invested',
    number: '$1,013,724.41'
  },
  holdings: {
    title: 'Holdings',
    items: [
      {
        name: 'BTC',
        percent: 30
      },
      {
        name: 'SOL',
        percent: 20
      },
      {
        name: 'ETH',
        percent: 15
      },
      {
        name: 'JUP',
        percent: 10
      },
      {
        name: 'RNDR',
        percent: 10
      },
      {
        name: 'HNT',
        percent: 5
      },
      {
        name: 'BONK',
        percent: 5
      },
      {
        name: 'PYTH',
        percent: 5
      },
    ]
  },
  description: {
    title: 'Description',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
  }
}


const ClassicEarnItemPage = () => {
  const { setModalName } = useModalsContext()

  return (
    <div>
      <BackLink title={'Home Page'} path={'/'}/>
      <PageTitle title={'Classic + Earn'} isBadges>
        <div className={'flex gap-4'}>
          <Button className={'flex-1 gap-2'} variant={'accent'}>
            <ArrowUpDown className={'w-4 h-4'}/>
            Transfer
          </Button>
          <Button className={'flex-1 gap-2'} variant={'destructive'} onClick={() => setModalName('BURN_NFT')}>
            <Flame className={'w-4 h-4'}/>
            Burn
          </Button>
        </div>
      </PageTitle>

      <PageHeader>
        <AmountCard className={'flex-1'} amount={tempData.amount}/>
        <HoldingsCard className={'flex-1'} holdings={tempData.holdings}/>
        <DescriptionCard className={'flex-1'} description={tempData.description}/>
      </PageHeader>

      <div className={'flex gap-8 items-start'}>
        <AssetsCard className={'flex-1'}>
          table
        </AssetsCard>
        <InvestCard className={'flex-2'}>
          <ClassicForm/>
        </InvestCard>
      </div>
    </div>
  )
}

export default ClassicEarnItemPage