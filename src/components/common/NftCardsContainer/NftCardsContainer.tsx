import { NftCard } from '@/components/widgets/cards/NftCard/NftCard.tsx'
import { useGetNfts } from '@/lib/blockchain/hooks/useGetNfts'
import { useWallet } from '@solana/wallet-adapter-react';
import { useCurrentPriceNft } from '../../../lib/hooks/useCurrentPriceNft';
import { currencyFormatter } from '@/lib/utils';

export const NftCardsContainer = () => {
  const { publicKey } = useWallet();
  const { tokens } = useGetNfts();

  const tempData = [
    {
      symbol: 'BTC',
      amount: 1,
    },
    {
      symbol: 'SOL',
      amount: 1,
    },
    {
      symbol: 'ETH',
      amount: 1,
    },
    {
      symbol: 'JUP',
      amount: 1,
    },
    {
      symbol: 'RNDR',
      amount: 1,
    },
    {
      symbol: 'HNT',
      amount: 1,
    },
    {
      symbol: 'BONK',
      amount: 1,
    },
    {
      symbol: 'PYTH',
      amount: 1,
    },
  ]
  const { currentPrice } = useCurrentPriceNft({ collection: 'Classic', amountCoins: tempData });


  if (!publicKey) {
    return (
      <div className='h-[340px] flex justify-center items-center text-[20px]'>Please, connect wallet.</div>
    )
  }

  const content = {
    price: currencyFormatter(currentPrice ?? 0),
    invested: '$51,009.79',
  }
  const cardsData = tokens?.map((token: any) => { return { ...token, content } });

  return (
    <>
      {cardsData.length === 0 ?
        <div className='h-[340px] flex justify-center items-center text-[20px]'>We have just checked, but there are no portfolios in your wallet.</div>
        :
        <div className='grid grid-cols-3 gap-4'>
          {cardsData.map((item, i) => {
            const data = item?.metadata;
            return <NftCard key={`${data?.name}#${i}`} title={data.name} content={item?.content} uri={data?.uri} mint={data?.mint} />;
          })}
        </div>
      }
    </>
  )
}
