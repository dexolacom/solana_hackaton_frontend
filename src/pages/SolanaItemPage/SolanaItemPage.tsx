import { PageHeader } from '@/components/common/PageHeader/PageHeader.tsx';
import { AmountCard } from '@/components/widgets/cards/AmountCard/AmountCard.tsx';
import { HoldingsCard } from '@/components/widgets/cards/HoldingsCard/HoldingsCard.tsx';
import { DescriptionCard } from '@/components/widgets/cards/DescritptionCard/DescriptionCard.tsx';
import { AssetsCard } from '@/components/widgets/cards/AssetsCard/AssetsCard.tsx';
import { InvestCard } from '@/components/widgets/cards/InvestCard/InvestCard.tsx';
import { PageTitle } from '@/components/common/PageTitle/PageTitle.tsx';
import { ClassicForm } from '@/components/features/forms/ClassicForm/ClassicForm.tsx';
import cardBackground from '@/assets/images/ecosystemCase.webp';
import { Button } from '@/components/ui/Button.tsx';
import { BackLink } from '@/components/common/BackLink/BackLink.tsx';
import { useModalsContext } from '@/providers/ModalProvider/ModalProvider.tsx';
import { SolanaItemTable } from '@/components/features/tabels/SolanaItemTable/SolanaItemTable';
import { useSearchParams, useParams } from 'react-router-dom';
import { currencyFormatter } from '@/lib/utils';
import { ecosystemHoldings } from '@/lib/constants';
import { PortfolioTitleWrapper } from '@/components/common/PortfolioTitleWrapper/PortfolioTitleWrapper';

const SolanaItemPage = () => {
  // useNavigateTo('/');


 

  const [searchParams] = useSearchParams();
  const { setModalName } = useModalsContext();
  const { item } = useParams();
  const invested = searchParams.get('invested');
  const currentPrice = searchParams.get('currentPrice');

  const tempData = {
    amount: {
      title: 'Current Portfolio Price',
      number: currencyFormatter(+(currentPrice ?? '0'))
    },
    ...ecosystemHoldings,
    description: {
      title: 'Description',
      text: `The Solana Ecosystem portfolio is tailored for enthusiasts who believe in the Solana network's potential. It comprises assets tied to the Solana ecosystem, providing investors with the opportunity to participate in the network's growth and development.`
    }
  };

  return (
    <div>
      <BackLink title={'My holdings'} path={'/my-holdings'} />
      <PageTitle title={item ?? 'SOLANA ECOSYSTEM item'}>
        <div className={'flex gap-4'}>
          <Button className={'flex-1 gap-2'} variant={'accent'} onClick={() => setModalName('TRANSFER_NFT')}>
            Transfer
          </Button>
          <Button className={'flex-1 gap-2'} variant={'destructive'} onClick={() => setModalName('BURN_NFT')}>
            Burn
          </Button>
        </div>
      </PageTitle>
      <PageHeader>
        <PortfolioTitleWrapper image={cardBackground}>
          <AmountCard className={'flex-1'} amount={tempData.amount} headerVariant='holdings'>
            <div className={'flex flex-col gap-1 text-sm font-medium mt-16'}>
              <span className={'text-sm font-medium'}>Invested</span>
              <span className={'font-roboto'}>{currencyFormatter(invested ? +invested : 0)}</span>
            </div>
          </AmountCard>
        </PortfolioTitleWrapper>
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
  );
};

export default SolanaItemPage;
