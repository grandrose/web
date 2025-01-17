import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { orderId } = req.query;
  if (!orderId) {
    return res.status(400).json({ error: "orderId is required" });
  }

  const { REACT_APP_SHOPIFY_STORE_DOMAIN, REACT_APP_SHOPIFY_ADMIN_API } =
    process.env;

  if (!REACT_APP_SHOPIFY_STORE_DOMAIN || !REACT_APP_SHOPIFY_ADMIN_API) {
    return res
      .status(500)
      .json({ error: "Shopify environment variables missing" });
  }
  const query = `
  query getOrder($id: ID!) {
    order(id: $id) {
      id
      name
      displayFinancialStatus
      paymentGatewayNames
      transactions {
        id
        gateway
        status
        amountSet {
          presentmentMoney {
            amount
            currencyCode
          }
        }
      }
      shippingAddress {
        name
        address1
        city
        province
        zip
        country
      }
    }
  }
`;

  const variables = { id: orderId };

  try {
    const response = await fetch(
      `https://${REACT_APP_SHOPIFY_STORE_DOMAIN}/admin/api/2023-10/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": REACT_APP_SHOPIFY_ADMIN_API,
        },
        body: JSON.stringify({ query, variables }),
      }
    );

    const result = await response.json();

    if (!result.data?.order || result.errors) {
      const errorMessage =
        result.errors?.[0]?.message || "No order found or unknown error.";
      return res.status(400).json({ error: errorMessage });
    }

    const { order } = result.data;

    let maskedPaymentDetails = {};
    if (order.paymentDetails) {
      const { creditCardCompany, creditCardNumber } = order.paymentDetails;
      let lastFour = "";
      if (creditCardNumber) {
        const digits = creditCardNumber.replace(/\D/g, "");
        lastFour = digits.slice(-4);
      }
      maskedPaymentDetails = {
        creditCardCompany,
        creditCardNumber: lastFour ? `**** **** **** ${lastFour}` : null,
      };
    }

    return res.status(200).json({
      id: order.id,
      name: order.name,
      financialStatus: order.financialStatus,
      shippingAddress: order.shippingAddress,
      paymentGatewayNames: order.paymentGatewayNames || [],
      paymentDetails: maskedPaymentDetails,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}
