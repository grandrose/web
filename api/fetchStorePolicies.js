import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const SHOPIFY_STORE_DOMAIN = process.env.REACT_APP_SHOPIFY_STORE_DOMAIN;
  const SHOPIFY_STOREFRONT_ACCESS_TOKEN =
    process.env.REACT_APP_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  const query = `
    query {
      shop {
        privacyPolicy {
          title
          url
          body
        }
        refundPolicy {
          title
          url
          body
        }
        termsOfService {
          title
          url
          body
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
        body: JSON.stringify({ query }),
      }
    );

    const result = await response.json();

    if (response.ok && result.data) {
      res.status(200).json(result.data.shop);
    } else {
      const errMsg = result?.errors?.[0]?.message || "Unknown error";
      throw new Error(errMsg);
    }
  } catch (error) {
    console.error("Error fetching store policies:", error.message);
    res.status(500).json({ error: "Failed to fetch store policies" });
  }
}
