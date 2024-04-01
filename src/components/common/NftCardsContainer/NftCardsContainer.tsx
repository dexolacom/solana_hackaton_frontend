import { NftCard } from '@/components/widgets/cards/NftCard/NftCard.tsx'
import { useGetNfts } from '@/lib/blockchain/hooks/useGetNfts'

export const NftCardsContainer = () => {

  const { tokens } = useGetNfts();
  const content = {
    price: '$52,000.70',
    invested: '$51,009.79',
  }
  const cardsData = tokens?.map((token: any) => { return { ...token, content } });

  return (
    <div className={'grid grid-cols-3 gap-4'}>
      {cardsData.map((item, i) => {
        const data = item?.data?.data;
        return <NftCard key={`${data?.name}#${i}`} title={data.name} content={item?.content} uri={data?.uri} />
      })}
    </div>
  )
}
