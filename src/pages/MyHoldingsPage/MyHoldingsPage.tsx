import { useEffect } from 'react';
import { PageHeader } from '@/components/common/PageHeader/PageHeader.tsx';
import { HoldingsCard } from '@/components/widgets/cards/HoldingsCard/HoldingsCard.tsx';
import { AmountCard } from '@/components/widgets/cards/AmountCard/AmountCard.tsx';
import { InvestCard } from '@/components/widgets/cards/InvestCard/InvestCard.tsx';
import { HoldingsForm } from '@/components/features/forms/HoldingsForm/HoldingsForm.tsx';
import { NftCardsContainer } from '@/components/common/NftCardsContainer/NftCardsContainer.tsx';
import { MyHoldingsFilter } from '@/components/features/MyHoldingsFilter/MyHoldingsFilter.tsx';
import { currencyFormatter } from '@/lib/utils';
import { HoldingsFilterType } from '@/pages/MyHoldingsPage/lib/lib';
import { getHoldingPageData } from './lib/lib';
import { useSearchParams } from 'react-router-dom';
import { useNftData } from '@/lib/blockchain/hooks/useNftData';
import { useNavigateTo } from '@/lib/hooks/useNavigateTo';
import { Skeleton } from '@/components/common/Skeleton/Skeleton';

export type AmountVariantType = 'accentGray' | 'accent' | 'accentTeal';

const MyHoldingsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { invested, isLoading: isLoadingInvested } = useNftData();
  useNavigateTo('/');

  const holdingsFilter = (searchParams.get('filter') ?? 'all') as HoldingsFilterType;

  useEffect(() => {
    setSearchParams({ filter: 'all' });
  }, []);

  // const { data: classicInvested, isLoading: isLoadingClassic } = useTotalInvested(addressClassicCollection);
  const classicInvested = 0;
  const isLoadingClassic = false;
  const ecosystemInvested = 0;
  const isLoadingEcosystem = false;

  // const { data: ecosystemInvested, isLoading: isLoadingEcosystem } = useTotalInvested(addressEcosystemCollection);
  // console.log("🚀 ~ MyHoldingsPage ~ ecosystemInvested:", ecosystemInvested)

  const data = getHoldingPageData({
    variant: holdingsFilter!,
    classicInvested,
    ecosystemInvested,
    isLoadingClassic,
    isLoadingEcosystem
  });

  return (
    <div>
      <MyHoldingsFilter setFilter={setSearchParams} />
      <div className={'flex gap-8'}>
        <div className='flex-1'>
          <PageHeader>
            <AmountCard
              className={'w-[35%] font-bold bg-white rounden-lg shadow-sm p-6'}
              amount={data.amount}
              headerVariant='holdings'
            >
              <div className={'mt-8 flex flex-col gap-1 text-sm font-medium'}>
                <span className={'text-sm font-medium text-muted-foreground'}>Invested</span>
                <span className={'font-roboto'}>
                  {isLoadingInvested ? (
                    <Skeleton isLoader={false} height={20} width={50} />
                  ) : (
                    currencyFormatter(invested[holdingsFilter])
                  )}
                </span>
              </div>
            </AmountCard>
            <HoldingsCard
              className={'flex-1 shadow-sm'}
              holdings={data.holdings}
              progressVariant={data.progressVariant}
              withPercent={false}
            />
          </PageHeader>

          <h3 className={'text-2xl font-semibold mb-8'}>NFTs</h3>

          <NftCardsContainer />
        </div>

        <div className={'flex flex-col items-start'}>
          <InvestCard className='shadow-sm'>
            <HoldingsForm />
          </InvestCard>
        </div>
      </div>
    </div>
  );
};

export default MyHoldingsPage;
