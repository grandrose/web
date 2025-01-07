export const fetchProduct = async (handle) => {
  try {
    const response = await fetch(`/api/products/fetchProduct?handle=${handle}`);
    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }
    const product = await response.json();
    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};
