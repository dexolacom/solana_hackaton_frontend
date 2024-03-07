import { PageTitle } from '@/components/wrappers/PageTitle/PageTitle.tsx';
import { PageHeader } from '@/components/wrappers/PageHeader/PageHeader.tsx';
import { AmountCard } from '@/components/cards/AmountCard/AmountCard.tsx';
import { HoldingsCard } from '@/components/cards/HoldingsCard/HoldingsCard.tsx';
import { DescriptionCard } from '@/components/cards/DescritptionCard/DescriptionCard.tsx';
import { AssetsCard } from '@/components/cards/AssetsCard/AssetsCard.tsx';
import { InvestCard } from '@/components/cards/InvestCard/InvestCard.tsx';
import { ClassicForm } from '@/components/forms/ClassicForm/ClassicForm.tsx';
import { Badge } from '@/components/ui/Badge.tsx';

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

const badges = ['Landing', 'Staking', 'Vaults']

const ClassicEarnPage = () => {
  return (
    <div>
      <PageTitle>
        <span className={'flex gap-4 items-center'}>
          <span>CLASSIC + EARN</span>
          <span className={'flex gap-2'}>
            {badges?.map((badge, i) => (
              <Badge key={i}>
                {badge}
              </Badge>
            ))}
          </span>
        </span>

      </PageTitle>
      <PageHeader>
        <AmountCard className={'flex-1'} amount={tempData.amount}/>
        <HoldingsCard className={'flex-1'} holdings={tempData.holdings}/>
        <DescriptionCard className={'flex-1'} description={tempData.description}/>
      </PageHeader>
      <div className={'flex gap-8'}>
        <AssetsCard className={'flex-1'}/>
        <InvestCard className={'flex-2'}>
          <ClassicForm/>
        </InvestCard>
      </div>
    </div>
  )
}

export default ClassicEarnPage