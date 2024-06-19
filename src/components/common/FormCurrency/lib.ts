export const formatCurrencyNumber = (number: number) => {
  if (isNaN(number)) {
    return 0;
  }
  const formatter = Intl.NumberFormat('en', {
    notation: 'compact'
  });

  return formatter.format(number);
};
