import { NftCard } from '@/components/widgets/cards/NftCard/NftCard.tsx'
import { useGetNfts } from '@/lib/blockchain/hooks/useGetNfts'
import { useWallet } from '@solana/wallet-adapter-react';

export const NftCardsContainer = () => {
  const { publicKey } = useWallet();
  const { tokens } = useGetNfts();

  if (!publicKey) {
    return (
      <div className='h-[340px] flex justify-center items-center text-[20px]'>Please, connect wallet.</div>
    )
  }

  return (
    <>
      {tokens.length === 0 ?
        <div className='h-[340px] flex justify-center items-center text-[20px]'>We have just checked, but there are no portfolios in your wallet.</div>
        :
        <div className='grid grid-cols-3 gap-4'>
          {tokens.map((item, i) => {
            const data = item?.metadata;
            return <NftCard
              key={`${data?.name}#${i}`}
              title={data.name}
              uri={data?.uri} mint={data?.mint}
              collection={data?.collection?.value?.key} />;
          })}
        </div>
      }
    </>
  )
}
