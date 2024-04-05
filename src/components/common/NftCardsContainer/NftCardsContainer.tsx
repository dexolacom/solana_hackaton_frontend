import { NftCard } from '@/components/widgets/cards/NftCard/NftCard.tsx'
import { useNftData } from '@/lib/blockchain/hooks/useNftData';
import { useWallet } from '@solana/wallet-adapter-react';
import { Loader2 } from 'lucide-react';

export const NftCardsContainer = () => {
  const { publicKey } = useWallet();
  const { cards, isLoading } = useNftData();

  if (!publicKey) {
    return (
      <div className='h-[340px] flex justify-center items-center text-[20px]'>Please, connect wallet.</div>
    )
  }

  if (isLoading && cards.length === 0) {
    return (
      <div className='w-full h-[340px] flex justify-center items-center'>
        <Loader2 size={80} className='animate-spin'/>
      </div>
    )
  }

  return (
    <>
      {cards.length === 0 ?
        <div className='h-[340px] flex justify-center items-center text-[20px]'>We have just checked, but there are no portfolios in your wallet.</div>
        :
        <div className='grid grid-cols-3 gap-4'>
          {cards.map((item, i) => {
            const data = item?.metadata;
            return <NftCard
              key={`${data?.name}#${i}`}
              title={data.name}
              uri={data?.uri}
              investedPrice={item.content.investedPrice}
              collection={data?.collection?.value?.key}
              mint={data?.mint}
            />;
          })}
        </div>
      }
    </>
  )
}
