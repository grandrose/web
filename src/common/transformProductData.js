export function transformProductData(product) {
  return {
    price: product.variants[0]?.price.amount.amount,
    title: product.title,
    images: product.images,
    variants: product.variants,
    id: product.variants[0]?.id,
    available: product.availableForSale,
    description: product.description,
    ingredients: product.metafields.ingredients,
    contents: product.metafields.contents,
    warnings: product.metafields.warnings,
    background: product.metafields.product_theme,
    shippingLocations:
      product.metafields.shipping_locations === "all"
        ? "Shipping Nation-Wide."
        : `Shipping to: ${
            product.metafields.shipping_locations?.split(",").join(", ") ||
            "N/A"
          }`,
  };
}
