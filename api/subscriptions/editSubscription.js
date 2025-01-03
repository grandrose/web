const fetch = require("node-fetch");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { accessToken, subscriptionId, updates } = req.body;

  if (!accessToken || !subscriptionId || !updates) {
    return res
      .status(400)
      .json({
        error: "Access token, subscription ID, and updates are required",
      });
  }

  const SHOPIFY_STORE_DOMAIN = process.env.REACT_APP_SHOPIFY_STORE_DOMAIN;
  const SHOPIFY_STOREFRONT_ACCESS_TOKEN =
    process.env.REACT_APP_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  const mutation = `
    mutation($id: ID!, $input: SubscriptionContractUpdateInput!) {
      subscriptionContractUpdate(id: $id, input: $input) {
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
          variables: { id: subscriptionId, input: updates },
        }),
      }
    );

    const result = await response.json();

    if (response.ok && result.data) {
      res.status(200).json(result.data.subscriptionContractUpdate);
    } else {
      throw new Error(
        result.errors ? result.errors[0].message : "Unknown error"
      );
    }
  } catch (error) {
    console.error("Error updating subscription:", error.message);
    res.status(500).json({ error: "Failed to update subscription" });
  }
}
