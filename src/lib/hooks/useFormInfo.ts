import { useEffect, useState } from 'react'

type FormData = {
  amount: string | number
  amountCurrency: string
  withdrawal: string
}

const numbersFormatter = (number: number) => {
  return number.toLocaleString('fullwide', { useGrouping: false })
}

export const useFormInfo = (formData: FormData) => {
  const amount = formData.amount
  const amountCurrency = formData.amountCurrency
  const solanaCourse = 199.84 // need to get from backend
  const [amountUSD, setAmountUSD] = useState('0')
  const [fee, setFee] = useState('')

  useEffect(() => {
    if (amount === '') {
      setFee('0')
      setAmountUSD('0')
      return
    }

    if (formData.amountCurrency === 'SOL') {
      setAmountUSD(numbersFormatter(+amount * solanaCourse))
    } else {
      setAmountUSD(`${amount}`)
    }

    setFee(numbersFormatter(+amount * 0.05))
  }, [amount, amountCurrency])

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
