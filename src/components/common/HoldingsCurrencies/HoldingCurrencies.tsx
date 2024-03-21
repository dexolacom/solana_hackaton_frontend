import { currencyIcons, classicCurrencyInfo } from '@/lib/constants.tsx'

export const HoldingCurrencies = () => {
  return (
    <div className={'flex gap-6 flex-wrap'}>
      {/*temp data*/}
      {classicCurrencyInfo.map((item) => (
        <div key={item.title} className={'flex items-center gap-2 text-sm'}>
          <span className={'flex gap-2 items-center'}>
            <img className={'h-6 w-6 -mt-[3px]'} src={currencyIcons[item.title]} />
            {item.title}
          </span>
          <span>{item.percent * 100} %</span>
        </div>
      ))}
    </div>
  )
}
