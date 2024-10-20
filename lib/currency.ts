const brazilianReal = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

/**
 * Convert a given value in cents to Brazilian Real currency format.
 * 
 * @param valueInCents The value in cents to convert to Brazilian Real currency format.
 * @returns The value converted to Brazilian Real currency format.
 */
export function convertToBrazilianReal(valueInCents: number): string {
  return brazilianReal.format(valueInCents / 100);
}
