import { PageHeader } from '@/components/common/PageHeader/PageHeader.tsx';
import { AmountCard } from '@/components/widgets/cards/AmountCard/AmountCard.tsx';
import { HoldingsCard } from '@/components/widgets/cards/HoldingsCard/HoldingsCard.tsx';
import { DescriptionCard } from '@/components/widgets/cards/DescritptionCard/DescriptionCard.tsx';
import { AssetsCard } from '@/components/widgets/cards/AssetsCard/AssetsCard.tsx';
import { InvestCard } from '@/components/widgets/cards/InvestCard/InvestCard.tsx';
import { PageTitle } from '@/components/common/PageTitle/PageTitle.tsx';
import { ClassicForm } from '@/components/features/forms/ClassicForm/ClassicForm.tsx';
import { Button } from '@/components/ui/Button.tsx';
import cardBackground from '@/assets/images/classicCase.webp';
import { BackLink } from '@/components/common/BackLink/BackLink.tsx';
import { useModalsContext } from '@/providers/ModalProvider/ModalProvider.tsx';
import { ClassicItemTable } from '@/components/features/tabels/ClassicItemTable/ClassicItemTable.tsx';
import { useParams, useSearchParams } from 'react-router-dom';
import { currencyFormatter } from '@/lib/utils';
import { addressClassicCollection } from '@/lib/blockchain/constant';
import { classicHoldings } from '@/lib/constants';
// import { useNavigateTo } from '@/lib/hooks/useNavigateTo';
import { PortfolioTitleWrapper } from '@/components/common/PortfolioTitleWrapper/PortfolioTitleWrapper';


const ClassicItemPage = () => {

  // useNavigateTo('/');
 
  const [searchParams] = useSearchParams();
  const { item } = useParams();
  const { setModalName, setNftPrice, setNftTitle, setCollection } = useModalsContext();
  const invested = searchParams.get('invested');
  const currentPrice = searchParams.get('currentPrice');
  const tempData = {
  amount: {
    title: 'Current Portfolio Price',
    number: currencyFormatter(+(currentPrice ?? '0'))
  },
  ...classicHoldings,
  description: {
    title: 'Description',
    text: 'The Classic portfolio is a balanced investment strategy comprising a mix of low-risk and high-risk assets. With allocations across various cryptocurrencies, it aims to optimize returns while managing potential risks effectively.'
  }
};

  return (
    <div>
      <BackLink title={'My holdings'} path={'/my-holdings'} />
      <PageTitle title={item ?? `CLASSIC ${item}`} className='mb-6 font-xl'>
        <div className={'flex gap-4'}>
          <Button
            className={'flex-1 gap-2'}
            variant={'outline'}
            onClick={() => {
              setModalName('TRANSFER_NFT');
              setNftTitle(item ?? '');
              setCollection(addressClassicCollection);
            }}
          >
            Transfer
          </Button>
          <Button
            className={'flex-1 gap-2'}
            variant={'accent'}
            onClick={() => {
              setModalName('BURN_NFT');
              setNftPrice(currentPrice ? currentPrice.toString() : '0');
              setNftTitle(item ?? '');
              setCollection(addressClassicCollection);
            }}
          >
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
  );
};

export default ClassicItemPage;
