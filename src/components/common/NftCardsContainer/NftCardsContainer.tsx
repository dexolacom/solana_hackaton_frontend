import { NftCard } from '@/components/widgets/cards/NftCard/NftCard.tsx'

export const NftCardsContainer = () => {
  const tempData = [
    {
      title: 'Classic',
      content: {
        price: '$52,000.70',
        invested: '$51,009.79',
      },
    },
    {
      title: 'Classic',
      content: {
        price: '$52,000.70',
        invested: '$51,009.79',
      },
    },
    {
      title: 'Classic',
      content: {
        price: '$52,000.70',
        invested: '$51,009.79',
      },
    },
    {
      title: 'Classic',
      content: {
        price: '$52,000.70',
        invested: '$51,009.79',
      },
    },
  ]

  return (
    <div className={'grid grid-cols-4 gap-4'}>
      {tempData.map((item, i) => (
        <NftCard key={i} title={item?.title} content={item?.content} />
      ))}
    </div>
  )
}
