import React, { createContext, useContext, useEffect, useState } from "react";
import shopifyClient from "../lib/shopifyClient";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
  const [customer, setCustomer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedCustomer = localStorage.getItem("shopify_customer");
    if (savedCustomer) {
      const { accessToken } = JSON.parse(savedCustomer);
      fetchCustomerDetails(accessToken)
        .then((customerData) => {
          setCustomer({ ...customerData, accessToken });
        })
        .catch((error) => {
          console.error("Error fetching customer details:", error);
          localStorage.removeItem("shopify_customer");
        });
    }
  }, []);

  const signUp = async (email, password) => {
    try {
      setIsLoading(true);
      const response = await shopifyClient.customer.create({
        email,
        password,
      });
      setCustomer(response.customer);
      localStorage.setItem(
        "shopify_customer",
        JSON.stringify(response.customer)
      );
    } catch (error) {
      console.error("Sign-up error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCustomerDetails = async (accessToken) => {
    const query = `
      query {
        customer {
          email
          firstName
          lastName
          phone
          addresses {
            address1
            city
            country
          }
        }
      }
    `;
    const response = await fetch(
      `https://${process.env.REACT_APP_SHOPIFY_STORE_DOMAIN}/api/2023-10/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token":
            process.env.REACT_APP_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ query }),
      }
    );
    const result = await response.json();
    if (result.errors) {
      throw new Error(result.errors[0].message);
    }
    return result.data.customer;
  };

  const login = async (email, password) => {
    const url = `https://${process.env.REACT_APP_SHOPIFY_STORE_DOMAIN}/api/2023-10/graphql.json`;
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
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token":
            process.env.REACT_APP_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
        },
        body: JSON.stringify({
          query: mutation,
          variables: { email, password },
        }),
      });

      const result = await response.json();

      // Handle Shopify user errors
      const errors = result.data.customerAccessTokenCreate.userErrors;
      if (errors && errors.length > 0) {
        throw new Error(errors[0].message);
      }

      // Extract and return the access token
      const accessToken =
        result.data.customerAccessTokenCreate.customerAccessToken.accessToken;
      const expiresAt =
        result.data.customerAccessTokenCreate.customerAccessToken.expiresAt;
      setCustomer({ accessToken: accessToken });
      return { accessToken, expiresAt };
    } catch (error) {
      console.error("Login error:", error.message);
      throw error;
    }
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        setIsLoading(true);
        const { data: googleUser } = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );

        const { email } = googleUser;

        // Check if the user already exists in Shopify, otherwise sign them up
        const existingCustomer = await shopifyClient.customer.search({
          query: `email:${email}`,
        });

        if (existingCustomer?.customers?.length > 0) {
          // Existing customer: fetch and log in
          const customerData = existingCustomer.customers[0];
          setCustomer(customerData);
          localStorage.setItem(
            "shopify_customer",
            JSON.stringify(customerData)
          );
        } else {
          // New customer: create in Shopify
          const newCustomer = await shopifyClient.customer.create({
            email,
            password: `google_${response.access_token}`,
          });
          setCustomer(newCustomer.customer);
          localStorage.setItem(
            "shopify_customer",
            JSON.stringify(newCustomer.customer)
          );
        }
      } catch (error) {
        console.error("Google login error:", error);
      } finally {
        setIsLoading(false);
      }
    },
    onError: (error) => {
      console.error("Google OAuth error:", error);
    },
  });

  const logout = () => {
    setCustomer(null);
    localStorage.removeItem("shopify_customer");
  };

  return (
    <CustomerContext.Provider
      value={{
        customer,
        isLoading,
        signUp,
        login,
        loginWithGoogle,
        logout,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomer = () => {
  return useContext(CustomerContext);
};
