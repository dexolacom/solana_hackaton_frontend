export const formatCurrencyNumber = (number: number) => {
  if (isNaN(number)) {
    return 0;
  }
  const formatter = Intl.NumberFormat('en', {
    notation: 'compact'
    // style: 'currency',
    // currency: 'USD',
  });

  return formatter.format(number);
};
