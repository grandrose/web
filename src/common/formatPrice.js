export function formatPrice(amount, currency = "USD") {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  });

  return formatter.format(amount);
}
