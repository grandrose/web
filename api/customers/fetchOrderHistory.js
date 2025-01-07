const fetch = require("node-fetch");

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { accessToken } = req.query;

  if (!accessToken) {
    return res.status(400).json({ error: "Access token is required" });
  }

  const SHOPIFY_STORE_DOMAIN = process.env.REACT_APP_SHOPIFY_STORE_DOMAIN;
  const SHOPIFY_STOREFRONT_ACCESS_TOKEN =
    process.env.REACT_APP_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  const query = `
query customerOrders($accessToken: String!) {
  customer(customerAccessToken: $accessToken) {
    orders(first: 10) {
      edges {
        node {
          id
          name
          orderNumber
          processedAt
          fulfillmentStatus
          financialStatus
          totalPriceV2 {
            amount
            currencyCode
          }
          shippingAddress {
            address1
            address2
            city
            province
            country
            zip
          }

          # discountApplications (no "type" field)
          discountApplications(first: 10) {
            edges {
              node {
                __typename
                allocationMethod
                targetSelection
                targetType
                value {
                  __typename
                  ... on PricingPercentageValue {
                    percentage
                  }
                  ... on MoneyV2 {
                    amount
                    currencyCode
                  }
                }
                ... on DiscountCodeApplication {
                  code
                  applicable
                }
                ... on ManualDiscountApplication {
                  title
                }
                ... on AutomaticDiscountApplication {
                  title
                }
                ... on ScriptDiscountApplication {
                  title
                }
              }
            }
          }

          lineItems(first: 50) {
            edges {
              node {
                title
                quantity
                variant {
                  price {
                    amount
                    currencyCode
                   }
                    image {
                      src
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
  `;

  try {
    const response = await fetch(
      `https://${SHOPIFY_STORE_DOMAIN}/api/2023-10/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_ACCESS_TOKEN,
        },
        body: JSON.stringify({
          query,
          variables: { accessToken },
        }),
      }
    );

    const result = await response.json();

    if (response.ok && result.data) {
      const orders =
        result.data.customer?.orders?.edges?.map((edge) => edge.node) || [];
      res.status(200).json({ orders });
    } else {
      throw new Error(
        result.errors ? result.errors[0].message : "Unknown error"
      );
    }
  } catch (error) {
    console.error("Error fetching order history:", error.message);
    res.status(500).json({ error: "Failed to fetch order history" });
  }
}
