import React, { createContext, useContext, useEffect, useState } from "react";
import shopifyClient from "../lib/shopifyClient";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
  const [customer, setCustomer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fetchCustomer = async () => {
      setIsLoading(true);
      const savedCustomer = localStorage.getItem("shopify_customer");
      if (savedCustomer) {
        try {
          const { accessToken } = JSON.parse(savedCustomer);
          const customerData = await fetchCustomerDetails(accessToken);
          setCustomer({ ...customerData, accessToken });
        } catch (error) {
          console.error("Error fetching customer details:", error);
          localStorage.removeItem("shopify_customer");
        }
      }
      setIsLoading(false);
      setHasLoaded(true);
    };

    fetchCustomer();
  }, []);

  const signUp = async (email, password) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to sign up");
      }
      const data = await response.json();
      setCustomer(data.customer);
      localStorage.setItem("shopify_customer", JSON.stringify(data.customer));
    } catch (error) {
      console.error("Sign-up error:", error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to log in");
      }
      const data = await response.json();
      const { accessToken, expiresAt } = data;
      setCustomer({ accessToken });
      localStorage.setItem(
        "shopify_customer",
        JSON.stringify({ accessToken, expiresAt })
      );
    } catch (error) {
      console.error("Login error:", error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCustomerDetails = async (accessToken) => {
    try {
      const response = await fetch(
        `/api/customers/fetchCustomerDetails?accessToken=${accessToken}`
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching customer details:", error);
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
    setTimeout(() => {
      setCustomer(null);
      localStorage.removeItem("shopify_customer");
    }, 500);
  };

  return (
    <CustomerContext.Provider
      value={{
        customer,
        isLoading,
        hasLoaded,
        signUp,
        login,
        loginWithGoogle,
        logout,
        fetchCustomerDetails,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomer = () => {
  return useContext(CustomerContext);
};
