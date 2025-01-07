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
    query customerQuery($accessToken: String!) {
      customer(customerAccessToken: $accessToken) {
        email
        firstName
        lastName
        phone

        defaultAddress {
          id
        }

        addresses(first: 10) {
          edges {
            node {
              id
              address1
              address2
              city
              province
              country
              zip
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
      res.status(200).json(result.data.customer);
    } else {
      throw new Error(
        result.errors ? result.errors[0].message : "Unknown error"
      );
    }
  } catch (error) {
    console.error("Error fetching customer details:", error.message);
    res.status(500).json({ error: "Failed to fetch customer details" });
  }
}
