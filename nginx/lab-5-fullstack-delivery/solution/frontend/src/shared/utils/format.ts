export const toCurrency = (value: number): string =>
  new Intl.NumberFormat('en-US', {
    currency: 'USD',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
    style: 'currency',
  }).format(value);

export const toDateTime = (value: string): string =>
  new Date(value).toLocaleString('en-US');
