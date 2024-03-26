import { currencyIcons } from '@/lib/constants.tsx'
import { formatCurrencyNumber } from '@/components/common/FormCurrency/lib.ts'

interface Currency {
  title: string
  value: number
}

interface FormCurrencyProps {
  data: Currency[]
  columns: Record<string, number[]>
}

export const FormCurrency = (props: FormCurrencyProps) => {
  const { data, columns } = props
  const { firstColumn, secondColumn } = columns

  return (
    <div className={'flex gap-10'}>
      <div className={'flex flex-col gap-2 flex-1'}>
        {data.slice(firstColumn[0], firstColumn[1]).map((item: Currency) => (
          <div key={item.title} className={'flex items-center justify-between text-sm'}>
            <span className={'flex gap-2'}>
              <img className={'h-6 w-6 -mt-[3px]'} src={currencyIcons[item.title]} />
              {item.title}
            </span>
            <span className={'font-roboto'}>${formatCurrencyNumber(item.value)}</span>
          </div>
        ))}
      </div>

      <div className={'flex flex-col gap-2 flex-1'}>
        {data.slice(secondColumn[0], secondColumn[1]).map((item: Currency) => (
          <div key={item.title} className={'flex items-center justify-between text-sm'}>
            <span className={'flex gap-2'}>
              <img className={'h-6 w-6 -mt-[3px]'} src={currencyIcons[item.title]} />
              {item.title}
            </span>
            <span className={'font-roboto'}>${formatCurrencyNumber(item.value)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
