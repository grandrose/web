import Client from "shopify-buy";

const shopifyClient = Client.buildClient({
  domain: process.env.REACT_APP_SHOPIFY_STORE_DOMAIN,
  storefrontAccessToken: process.env.REACT_APP_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
});

export default shopifyClient;
