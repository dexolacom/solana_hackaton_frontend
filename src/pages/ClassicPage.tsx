import { PageHeader } from '@/components/PageHeader/PageHeader.tsx';
import { AmountCard } from '@/components/AmountCard/AmountCard.tsx';
import { HoldingsCard } from '@/components/HoldingsCard/HoldingsCard.tsx';
import { DescriptionCard } from '@/components/DescritptionCard/DescriptionCard.tsx';

const ClassicPage = () => {
  const tempData = {
    amount: {
      title: 'Total amount invested',
      number: '$1,013,724.41'
    },
    holdings: {
      title: 'Holdings'
    },
    description: {
      title: 'Description',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
    }
  }

  return (
    <div>
      <PageHeader>
        <AmountCard className={'flex-1'} amount={tempData.amount}/>
        <HoldingsCard className={'flex-1'} holdings={tempData.holdings}/>
        <DescriptionCard className={'flex-1'} description={tempData.description}/>
      </PageHeader>
    </div>
  )
}

export default ClassicPage