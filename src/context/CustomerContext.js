import React, { createContext, useContext, useEffect, useState } from "react";
import shopifyClient from "../lib/shopifyClient";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
  const [customer, setCustomer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const isLoggedIn = !!customer;

  useEffect(() => {
    const savedCustomer = localStorage.getItem("shopify_customer");
    if (savedCustomer) {
      setCustomer(JSON.parse(savedCustomer));
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

  const login = async (email, password) => {
    try {
      setIsLoading(true);
      const response = await shopifyClient.customerAccessToken.create({
        email,
        password,
      });
      const accessToken = response.customerAccessToken.accessToken;
      const customerData = await shopifyClient.customer.fetch(accessToken);
      setCustomer(customerData);
      localStorage.setItem("shopify_customer", JSON.stringify(customerData));
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
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
        isLoggedIn,
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
