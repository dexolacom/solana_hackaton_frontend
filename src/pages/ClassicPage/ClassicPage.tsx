import { PageHeader } from '@/components/common/PageHeader/PageHeader.tsx';
import { AmountCard } from '@/components/widgets/cards/AmountCard/AmountCard.tsx';
import { HoldingsCard } from '@/components/widgets/cards/HoldingsCard/HoldingsCard.tsx';
import { DescriptionCard } from '@/components/widgets/cards/DescritptionCard/DescriptionCard.tsx';
import { AssetsCard } from '@/components/widgets/cards/AssetsCard/AssetsCard.tsx';
import { InvestCard } from '@/components/widgets/cards/InvestCard/InvestCard.tsx';
import { PageTitle } from '@/components/common/PageTitle/PageTitle.tsx';
import { ClassicForm } from '@/components/features/forms/ClassicForm/ClassicForm.tsx';
import { ClassicPageTable } from '@/components/features/tabels/ClassicPageTable/ClassicPageTable.tsx';
import { BackLink } from '@/components/common/BackLink/BackLink.tsx';
import { currencyFormatter } from '@/lib/utils';
import { useTotalInvested } from '@/lib/blockchain/hooks/useTotalInvested';
import { addressClassicCollection } from '@/lib/blockchain/constant';
import { classicHoldings } from '@/lib/constants';
import { PortfolioTitleWrapper } from '@/components/common/PortfolioTitleWrapper/PortfolioTitleWrapper';

const ClassicPage = () => {
  const { data: classicInvested, isLoading: isLoadingClassic } = useTotalInvested(addressClassicCollection);

  // const classicInvested = 0;
  // const isLoadingClassic = false;
  const tempData = {
    amount: {
      title: 'Total amount invested',
      number: isLoadingClassic ? 'Calculation...' : currencyFormatter(classicInvested ?? 0)
    },
    ...classicHoldings,
    description: {
      title: 'Description',
      text: 'The Classic portfolio is a balanced investment strategy comprising a mix of low-risk and high-risk assets. With allocations across various cryptocurrencies, it aims to optimize returns while managing potential risks effectively.'
    }
  };

  return (
    <div>
      <BackLink title={'Home page'} path={'/'} />
      <PageHeader>
        <PortfolioTitleWrapper>
          <PageTitle title={'classic'} />
          <AmountCard amount={tempData.amount} headerVariant='portfolio' descriptionVariant='portfolio' />
        </PortfolioTitleWrapper>
        <HoldingsCard className={'flex-1'} holdings={tempData.holdings} progressVariant={'classic'} />
        <DescriptionCard className={'flex-1'} description={tempData.description} />
      </PageHeader>
      <div className={'flex gap-8 items-start'}>
        <AssetsCard className={'flex-1'}>
          <ClassicPageTable />
        </AssetsCard>
        <InvestCard className={'flex-2'}>
          <ClassicForm />
        </InvestCard>
      </div>
    </div>
  );
};

export default ClassicPage;
