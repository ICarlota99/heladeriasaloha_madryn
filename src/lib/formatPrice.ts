export function formatPrice(price: number | string, fractionDigits = 0): string {
  const value = typeof price === 'string' ? Number(price.replace(',', '.')) : Number(price);
  if (Number.isNaN(value)) return '0';
  return value.toLocaleString('es-AR', {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });
}

export function parsePrice(price: number | string): number {
  if (typeof price === 'number') return price;
  return Number(price.replace(',', '.')) || 0;
}
