import { PageHeader } from '@/components/common/PageHeader/PageHeader.tsx';
import { AmountCard } from '@/components/widgets/cards/AmountCard/AmountCard.tsx';
import { HoldingsCard } from '@/components/widgets/cards/HoldingsCard/HoldingsCard.tsx';
import { DescriptionCard } from '@/components/widgets/cards/DescritptionCard/DescriptionCard.tsx';
import { AssetsCard } from '@/components/widgets/cards/AssetsCard/AssetsCard.tsx';
import { InvestCard } from '@/components/widgets/cards/InvestCard/InvestCard.tsx';
import { PageTitle } from '@/components/common/PageTitle/PageTitle.tsx';
import { ClassicForm } from '@/components/features/forms/ClassicForm/ClassicForm.tsx';
import { BackLink } from '@/components/common/BackLink/BackLink.tsx';
import { SolanaPageTable } from '@/components/features/tabels/SolanaPageTable/SolanaPageTable.tsx';
import { currencyFormatter } from '@/lib/utils';
import { ecosystemHoldings } from '@/lib/constants';
import cardBackground from '@/assets/images/ecosystemCase.webp';
import { PortfolioTitleWrapper } from '@/components/common/PortfolioTitleWrapper/PortfolioTitleWrapper';
import { useProjectList } from '@/lib/api/hooks/useProjectList';

const SolanaPage = () => {
  const { isLoading, ecosystemInvested } = useProjectList();

  const tempData = {
    amount: {
      title: 'Total amount invested',
      number: isLoading ? 'Calculation...' : currencyFormatter(ecosystemInvested ?? 0)
    },
    ...ecosystemHoldings,
    description: {
      title: 'Description',
      text: `The Solana Ecosystem portfolio is tailored for enthusiasts who believe in the Solana network's potential. It comprises assets tied to the Solana ecosystem, providing investors with the opportunity to participate in the network's growth and development.`
    }
  };

  return (
    <div>
      <BackLink title={'Home Page'} path={'/'} />
      <PageHeader>
        <PortfolioTitleWrapper image={cardBackground}>
          <PageTitle title={'solana ecosystem'} />
          <AmountCard amount={tempData.amount} headerVariant='portfolio' descriptionVariant='portfolio' />
        </PortfolioTitleWrapper>
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
  );
};

export default SolanaPage;
