export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  if (
    !process.env.REACT_APP_SHOPIFY_ADMIN_API ||
    !process.env.REACT_APP_SHOPIFY_STORE_DOMAIN
  ) {
    return res
      .status(500)
      .json({ error: "Shopify environment variables are missing" });
  }

  try {
    const query = `
        mutation customerCreate($input: CustomerInput!) {
          customerCreate(input: $input) {
            customer {
              id
              email
              emailMarketingConsent {
                marketingState
                marketingOptInLevel
                consentUpdatedAt
              }
            }
            userErrors {
              field
              message
            }
          }
        }
      `;

    const variables = {
      input: {
        email,
        emailMarketingConsent: {
          marketingState: "SUBSCRIBED",
          marketingOptInLevel: "CONFIRMED_OPT_IN",
          consentUpdatedAt: new Date().toISOString(),
        },
      },
    };

    const response = await fetch(
      `https://${process.env.REACT_APP_SHOPIFY_STORE_DOMAIN}/admin/api/2023-10/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": process.env.REACT_APP_SHOPIFY_ADMIN_API,
        },
        body: JSON.stringify({ query, variables }),
      }
    );

    const result = await response.json();

    if (
      !result.data?.customerCreate ||
      result.errors ||
      result.data.customerCreate.userErrors?.length > 0
    ) {
      const errorMessage =
        result.errors?.[0]?.message ||
        result.data.customerCreate.userErrors?.[0]?.message ||
        "An unknown error occurred.";
      return res.status(400).json({ error: errorMessage });
    }

    res.status(200).json({ message: "Customer added to marketing" });
  } catch (error) {
    console.error("Error adding customer to marketing:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
