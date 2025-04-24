export function PriceFormatter(price: number) {
  const newFormat = Intl.NumberFormat(undefined, {
    maximumSignificantDigits: 3,
  }).format(price);
  return newFormat;
}
