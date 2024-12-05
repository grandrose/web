import React, { createContext, useState, useEffect, useContext } from "react";
import shopifyClient from "../lib/shopifyClient";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const initializeCart = async () => {
      const existingCartId = localStorage.getItem("shopify_cart_id");
      if (existingCartId) {
        try {
          const existingCart = await shopifyClient.checkout.fetch(
            existingCartId
          );
          setCart(existingCart);
        } catch (error) {
          console.error("Failed to fetch existing cart:", error);
          localStorage.removeItem("shopify_cart_id");
        }
      } else {
        const newCart = await shopifyClient.checkout.create();
        setCart(newCart);
        localStorage.setItem("shopify_cart_id", newCart.id);
      }
    };

    initializeCart();
  }, []);

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

  const toggleCart = async () => {
    setIsOpen(!isOpen);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
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
