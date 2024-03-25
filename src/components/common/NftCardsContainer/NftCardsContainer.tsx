import { NftCard } from '@/components/widgets/cards/NftCard/NftCard.tsx'

export const NftCardsContainer = () => {
  const tempData = [
    {
      id: 1,
      title: 'classic',
      content: {
        price: '$52,000.70',
        invested: '$51,009.79',
      },
    },
    {
      id: 2,
      title: 'classic',
      content: {
        price: '$52,000.70',
        invested: '$51,009.79',
      },
    },
    {
      id: 1,
      title: 'solana',
      content: {
        price: '$52,000.70',
        invested: '$51,009.79',
      },
    },
    {
      id: 2,
      title: 'solana',
      content: {
        price: '$52,000.70',
        invested: '$51,009.79',
      },
    },
  ]

  return (
    <div className={'grid grid-cols-3 gap-4'}>
      {tempData.map((item, i) => (
        <NftCard key={i} title={item?.title} content={item?.content} id={item?.id} />
      ))}
    </div>
  )
}
