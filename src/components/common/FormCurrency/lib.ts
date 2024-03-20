export const formatCurrencyNumber = (number: number) => {
  const formatter = Intl.NumberFormat('en', {
    notation: 'compact',
    // style: 'currency',
    // currency: 'USD',
  })

  return formatter.format(number)
}