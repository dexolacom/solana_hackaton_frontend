import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const currencyFormatter = (num: number) => {
  const currencyOptions = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }

  const formatter = new Intl.NumberFormat('en-US', currencyOptions)

  return formatter.format(num)
}
