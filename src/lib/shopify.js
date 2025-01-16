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

export const fetchProduct = async (handle) => {
  try {
    const query = `
      query ($handle: String!) {
        productByHandle(handle: $handle) {
          id
          title
          handle
          description
          descriptionHtml
          availableForSale
          createdAt
          updatedAt
          vendor
          productType
          tags
          options {
            name
            values
          }
          images(first: 10) {
            edges {
              node {
                id
                src
                altText
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
                available
                sku
                image {
                  id
                  src
                  altText
                }
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
          metafields(first: 10) {
            edges {
              node {
                namespace
                key
                value
                type
              }
            }
          }
        }
      }
    `;

    const variables = { handle };
    const response = await shopifyClient.graphQLClient.send(query, variables);
    console.log("Product with metadata:", response.data.productByHandle);
    return response.data.productByHandle;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};
