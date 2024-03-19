import { currencyIcons } from '@/lib/constants.tsx'

interface Currency {
  title: string
  value: number
}

interface FormCurrencyProps {
  data: Currency[]
}

export const FormCurrency = (props: FormCurrencyProps) => {
  const { data } = props

  return (
    <div className={'flex gap-10'}>
      <div className={'flex flex-col gap-2 flex-1'}>
        {data.slice(0, 4).map((item: Currency) => (
          <div key={item.title} className={'flex items-center justify-between text-sm'}>
            <span className={'flex gap-2'}>
              <img className={'h-6 w-6 -mt-[3px]'} src={currencyIcons[item.title]} />
              {item.title}
            </span>
            <span>$ {item.value}</span>
          </div>
        ))}
      </div>

      <div className={'flex flex-col gap-2 flex-1'}>
        {data.slice(4, data.length).map((item: Currency) => (
          <div key={item.title} className={'flex items-center justify-between text-sm'}>
            <span className={'flex gap-2'}>
              <img className={'h-6 w-6 -mt-[3px]'} src={currencyIcons[item.title]} />
              {item.title}
            </span>
            <span>$ {item.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
