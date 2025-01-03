const fetch = require("node-fetch");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const SHOPIFY_STORE_DOMAIN = process.env.REACT_APP_SHOPIFY_STORE_DOMAIN;
  const SHOPIFY_STOREFRONT_ACCESS_TOKEN =
    process.env.REACT_APP_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  const mutation = `
    mutation customerAccessTokenCreate($email: String!, $password: String!) {
      customerAccessTokenCreate(input: { email: $email, password: $password }) {
        customerAccessToken {
          accessToken
          expiresAt
        }
        userErrors {
          field
          message
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
          query: mutation,
          variables: { email, password },
        }),
      }
    );

    const result = await response.json();

    if (result.data.customerAccessTokenCreate.userErrors.length > 0) {
      throw new Error(
        result.data.customerAccessTokenCreate.userErrors[0].message
      );
    }

    const { accessToken, expiresAt } =
      result.data.customerAccessTokenCreate.customerAccessToken;

    res.status(200).json({ accessToken, expiresAt });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ error: error.message });
  }
}
