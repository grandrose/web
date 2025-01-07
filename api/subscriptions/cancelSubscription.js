const fetch = require("node-fetch");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { accessToken, subscriptionId } = req.body;

  if (!accessToken || !subscriptionId) {
    return res
      .status(400)
      .json({ error: "Access token and subscription ID are required" });
  }

  const SHOPIFY_STORE_DOMAIN = process.env.REACT_APP_SHOPIFY_STORE_DOMAIN;
  const SHOPIFY_STOREFRONT_ACCESS_TOKEN =
    process.env.REACT_APP_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  const mutation = `
    mutation($id: ID!) {
      subscriptionContractCancel(id: $id) {
        subscriptionContract {
          id
          status
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
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          query: mutation,
          variables: { id: subscriptionId },
        }),
      }
    );

    const result = await response.json();

    if (response.ok && result.data) {
      res.status(200).json(result.data.subscriptionContractCancel);
    } else {
      throw new Error(
        result.errors ? result.errors[0].message : "Unknown error"
      );
    }
  } catch (error) {
    console.error("Error canceling subscription:", error.message);
    res.status(500).json({ error: "Failed to cancel subscription" });
  }
}
