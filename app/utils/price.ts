export function formatPrice(value: number, currency: string = "USD"): string {
  if (isNaN(value)) return "0.00";

  // giả sử value đang tính bằng cents
  const price = value / 100;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price);
}
