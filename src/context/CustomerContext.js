import React, { createContext, useContext, useEffect, useState } from "react";
import shopifyClient from "../lib/shopifyClient";

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

  //TODO
  // const loginWithProvider = async (provider) => {
  //   try {
  //     setIsLoading(true);

  //     // Example for Google OAuth using a third-party library
  //     const providerResponse = await someOAuthLibrary.login(provider);
  //     const { email, idToken } = providerResponse;

  //     const response = await shopifyClient.customer.createOrLogin({
  //       email,
  //       idToken,
  //     });

  //     setCustomer(response.customer);
  //     localStorage.setItem(
  //       "shopify_customer",
  //       JSON.stringify(response.customer)
  //     );
  //   } catch (error) {
  //     console.error(`${provider} login error:`, error);
  //     throw error;
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

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
        // loginWithProvider,
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
