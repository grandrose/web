import shopifyClient from "../src/lib/shopifyClient";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { query, variables } = req.body;

    if (!query) {
      return res.status(400).json({ error: "GraphQL query is required" });
    }
    if (query.toLowerCase().includes("mutation")) {
      return res.status(403).json({ error: "Mutations are not allowed" });
    }

    try {
      const result = await shopifyClient.graphql(query, variables);

      if (result.errors) {
        console.error("Shopify API Errors:", result.errors);
        return res.status(500).json({ error: result.errors });
      }

      res.status(200).json(result);
    } catch (error) {
      console.error("Error querying Shopify:", error);
      res.status(500).json({ error: "Error querying Shopify" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
