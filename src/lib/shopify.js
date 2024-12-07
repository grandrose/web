import shopifyClient from "./shopifyClient";

export const fetchAllProducts = async () => {
  const products = await shopifyClient.product.fetchAll();
  return products;
};

export const fetchProductByHandle = async (handle) => {
  try {
    const product = await shopifyClient.product.fetchByHandle(handle);
    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};
