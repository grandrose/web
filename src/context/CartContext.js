import React, { createContext, useContext, useEffect, useState } from "react";
import shopifyClient from "../lib/shopifyClient";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const initializeCart = async () => {
      const existingCartIdKey = "shopify_cart_id";
      const existingCartId = localStorage.getItem(existingCartIdKey);

      try {
        if (existingCartId) {
          const existingCart = await shopifyClient.checkout.fetch(
            existingCartId
          );

          if (existingCart) {
            setCart(existingCart);
            return;
          }
        }
      } catch (error) {
        console.warn("Old cart ID is invalid or not found:", error);
        // Clear invalid cart ID from storage
        localStorage.removeItem(existingCartIdKey);
      }

      // Create a new cart if no valid cart exists
      try {
        const newCart = await shopifyClient.checkout.create();
        setCart(newCart);
        localStorage.setItem(existingCartIdKey, newCart.id);
      } catch (error) {
        console.error("Failed to create a new cart:", error);
      }
    };

    initializeCart();
  }, []);

  const fetchCart = async () => {
    const cartId = localStorage.getItem("shopify_cart_id");
    if (!cartId) return;

    try {
      setIsLoading(true);
      const updatedCart = await shopifyClient.checkout.fetch(cartId);
      setCart(updatedCart);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (variantId, quantity = 1) => {
    let cartId = localStorage.getItem("shopify_cart_id");

    if (!cartId) {
      cartId = cart.id;
      localStorage.setItem("shopify_cart_id", cartId);
    }

    const lineItemsToAdd = [
      {
        variantId: String(variantId),
        quantity: Number(quantity),
      },
    ];

    try {
      setIsLoading(true);
      const updatedCart = await shopifyClient.checkout.addLineItems(
        cartId,
        lineItemsToAdd
      );
      setCart(updatedCart);
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (lineItemId) => {
    setIsLoading(true);
    try {
      const updatedCart = await shopifyClient.checkout.removeLineItems(
        cart.id,
        [lineItemId]
      );
      setCart(updatedCart);
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
    }
    setIsLoading(false);
  };

  const updateCartItem = async (lineItemId, quantity) => {
    setIsLoading(true);
    try {
      const updatedCart = await shopifyClient.checkout.updateLineItems(
        cart.id,
        [
          {
            id: lineItemId,
            quantity,
          },
        ]
      );
      setCart(updatedCart);
    } catch (error) {
      console.error("Failed to update item quantity:", error);
    }
    setIsLoading(false);
  };

  const clearCart = async () => {
    setIsLoading(true);
    try {
      const updatedCart = await shopifyClient.checkout.replaceLineItems(
        cart.id,
        []
      );
      setCart(updatedCart);
    } catch (error) {
      console.error("Failed to clear the cart:", error);
    }
    setIsLoading(false);
  };

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
        fetchCart,
        addToCart,
        removeFromCart,
        updateCartItem,
        clearCart,
        toggleCart,
        isOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
