import { currencyIcons } from '@/lib/constants.tsx'

export const FormCurrency = () => {
  const tempData = [
    {
      title: 'BTC',
      number: 30,
    },
    {
      title: 'ETH',
      number: 30,
    },
    {
      title: 'SOL',
      number: 30,
    },
    {
      title: 'JUP',
      number: 30,
    },
    {
      title: 'RNDR',
      number: 30,
    },
    {
      title: 'HNT',
      number: 30,
    },
    {
      title: 'BONK',
      number: 30,
    },
    {
      title: 'PYTH',
      number: 30,
    },
  ]

  return (
    <div className={'flex gap-10'}>
      <div className={'flex flex-col gap-2 flex-1'}>
        {tempData.slice(0, 4).map((item) => (
          <div
            key={item.title}
            className={'flex items-center justify-between text-sm'}
          >
            <span className={'flex gap-2'}>
              <img
                className={'h-6 w-6 -mt-[3px]'}
                src={currencyIcons[item.title]}
              />
              {item.title}
            </span>
            <span>$ {item.number}</span>
          </div>
        ))}
      </div>

      <div className={'flex flex-col gap-2 flex-1'}>
        {tempData.slice(4, tempData.length).map((item) => (
          <div
            key={item.title}
            className={'flex items-center justify-between text-sm'}
          >
            <span className={'flex gap-2'}>
              <img
                className={'h-6 w-6 -mt-[3px]'}
                src={currencyIcons[item.title]}
              />
              {item.title}
            </span>
            <span>$ {item.number}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
