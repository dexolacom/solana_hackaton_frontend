import { NftCard } from '@/components/widgets/cards/NftCard/NftCard.tsx';
import { addressClassicCollection } from '@/lib/blockchain/constant';
import { useNftData } from '@/lib/blockchain/hooks/useNftData';
import { useWallet } from '@solana/wallet-adapter-react';
import { Loader2 } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { HoldingsFilterType } from '@/pages/MyHoldingsPage/lib/lib';

export const NftCardsContainer = () => {
  const { publicKey } = useWallet();
  const { cards, isLoading } = useNftData();

  const [searchParams] = useSearchParams();

  const holdingsFilter = (searchParams.get('filter') ?? 'all') as HoldingsFilterType;

  if (!publicKey) {
    return <div className='h-[340px] flex justify-center items-center text-[20px]'>Please, connect wallet.</div>;
  }

  if (isLoading && cards && cards[holdingsFilter].length === 0) {
    return (
      <div className='w-full h-[340px] flex justify-center items-center'>
        <Loader2 size={80} className='animate-spin' />
      </div>
    );
  }

  return (
    <>
      {cards && cards[holdingsFilter].length === 0 ? (
        <div className='h-[340px] flex justify-center items-center text-[20px]'>
          We have just checked, but there are no portfolios in your wallet.
        </div>
      ) : (
        <div className='grid gap-4 grid-cols-2 1920:grid-cols-3 '>
          {cards &&
            cards[holdingsFilter].map((item) => {
              const title = item?.name.replace(
                'BiscuitPortfolio',
                item.collection.key.toString() === addressClassicCollection ? 'Classic# ' : 'Solana Ecosystem# '
              );
              return (
                <NftCard
                  key={`${item?.name}`}
                  title={title}
                  uri={item?.uri}
                  investedPrice={0}
                  collection={item.collection.key.toString()}
                  mint={item.addressMint}
                />
              );
            })}
        </div>
      )}
    </>
  );
};
