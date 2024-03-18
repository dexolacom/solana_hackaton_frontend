import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const currencyFormatter = (value: string) => {
  let num

  if (value.includes('$')) {
    num = parseInt(value.split(' ')[1])

    const currencyOptions = {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }

    const formatter = new Intl.NumberFormat('en-US', currencyOptions)

    return formatter.format(num)
  }

  return value
}
