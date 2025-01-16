export default async function handler(req, res) {
  const { handle } = req.query;

  if (!handle) {
    return res.status(400).json({ error: "Product handle is required" });
  }

  const query = `
    query GetProductWithMetafields($handle: String!) {
      productByHandle(handle: $handle) {
        id
        title
        description
        descriptionHtml
        availableForSale
        images(first: 5) {
          edges {
            node {
              src
            }
          }
        }
        variants(first: 10) {
          edges {
            node {
              id
              title
              availableForSale
              price {
                amount
                currencyCode
              }
            }
          }
        }
        metafields(identifiers: [
          { namespace: "custom", key: "warnings" },
          { namespace: "custom", key: "contents" },
          { namespace: "custom", key: "nutrition_facts" },
          { namespace: "custom", key: "shipping_locations" },
          { namespace: "custom", key: "background_color" }
          { namespace: "custom", key: "ingredients" }
        ]) {
          namespace
          key
          value
        }
      }
    }
  `;

  const variables = { handle };

  const SHOPIFY_API_URL = `https://${process.env.REACT_APP_SHOPIFY_STORE_DOMAIN}/api/2023-10/graphql.json`;
  const SHOPIFY_ACCESS_TOKEN =
    process.env.REACT_APP_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  try {
    const response = await fetch(SHOPIFY_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_ACCESS_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
    });

    const result = await response.json();

    if (result.errors) {
      return res.status(500).json({ error: "Failed to fetch product" });
    }

    const product = result.data?.productByHandle;

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const metafields =
      product.metafields?.reduce((acc, field) => {
        if (field?.key && field?.value) {
          acc[field.key] = field.value;
        }
        return acc;
      }, {}) || {};

    const simplifiedProduct = {
      id: product.id,
      title: product.title,
      description: product.description,
      descriptionHtml: product.descriptionHtml,
      availableForSale: product.availableForSale,
      images: product.images.edges.map((edge) => edge.node.src),
      variants: product.variants.edges.map((edge) => ({
        id: edge.node.id,
        title: edge.node.title,
        availableForSale: edge.node.availableForSale,
        price: edge.node.price,
      })),
      metafields,
    };

    return res.status(200).json(simplifiedProduct);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
