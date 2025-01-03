import shopifyClient from "../src/lib/shopifyClient";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { query, variables } = req.body;

    // Validate the request body
    if (!query) {
      return res.status(400).json({ error: "GraphQL query is required" });
    }

    // Optional: Restrict mutations for security
    if (query.toLowerCase().includes("mutation")) {
      return res.status(403).json({ error: "Mutations are not allowed" });
    }

    try {
      // Execute Shopify GraphQL query
      const result = await shopifyClient.graphql(query, variables);

      // Check for Shopify API errors
      if (result.errors) {
        console.error("Shopify API Errors:", result.errors);
        return res.status(500).json({ error: result.errors });
      }

      // Respond with Shopify API result
      res.status(200).json(result);
    } catch (error) {
      console.error("Error querying Shopify:", error);
      res.status(500).json({ error: "Error querying Shopify" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
