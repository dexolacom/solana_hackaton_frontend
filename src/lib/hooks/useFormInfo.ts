import { useEffect, useState } from 'react'

type FormData = {
  amount: string | number
  amountCurrency: string
  withdrawal: string | string[]
}

export const useFormInfo = (formData: FormData) => {
  const amount = formData.amount
  const amountCurrency = formData.amountCurrency
  const solanaCourse = 199.84 // need to get from backend
  const [amountUSD, setAmountUSD] = useState(0)
  const [fee, setFee] = useState(0)

  useEffect(() => {
    if (amount === '') {
      setFee(0)
      setAmountUSD(0)
      return
    }

    if (formData.amountCurrency === 'SOL') {
      setAmountUSD(+amount * solanaCourse)
      setFee(+(amountUSD * 0.005))
    } else {
      setAmountUSD(+amount)
      setFee(+(+amount * 0.005).toPrecision(2))
    }
  }, [amount, amountCurrency, amountUSD])

  return [
    {
      title: 'Amount in USD',
      value: `$ ${amountUSD}`,
    },
    {
      title: 'Slippage Tolerance',
      value: `1 %`,
    },
    {
      title: 'Platform Fee, 0.5%',
      value: `$ ${fee}`,
    },
  ]
}
