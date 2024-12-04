import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { QuantitySelector, Button } from "../theme";
import { IoClose } from "react-icons/io5";

export const Cart = ({ isModalOpen, toggleModal }) => {
  const { cart, updateCartItem, removeFromCart, isLoading } = useCart();

  return (
    <>
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-end p-6 z-50">
          <div className="relative bg-cream text-charcoal rounded-lg w-full max-w-md p-6">
            {/* Close Button */}
            <button
              onClick={toggleModal}
              className="absolute top-4 right-4 text-charcoal"
            >
              <IoClose size={24} />
            </button>

            {/* Loading State */}
            {isLoading ? (
              <p>Loading your cart...</p>
            ) : !cart || !cart.lineItems || cart.lineItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <>
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-bold">my cart</h2>
                  <p className="text-sm font-medium">
                    items ({cart.lineItems.length})
                  </p>
                </div>

                {/* Cart Items */}
                <div className="space-y-6">
                  {cart.lineItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between"
                    >
                      {/* Item Details */}
                      <div className="flex items-center space-x-4">
                        <img
                          src={item.variant.image.src}
                          alt={item.title}
                          className="w-16 h-16 border border-charcoal rounded-lg"
                        />
                        <div>
                          <p className="text-sm font-medium">{item.title}</p>
                          <p className="text-sm">{item.variant.title}</p>
                          <p className="text-sm">{item.variant.price}</p>
                          <button
                            className="text-sm text-red-500 hover:underline"
                            onClick={() => removeFromCart(item.id)}
                          >
                            x remove
                          </button>
                        </div>
                      </div>

                      {/* Quantity and Price */}
                      <div className="flex items-center space-x-4">
                        <QuantitySelector
                          quantity={item.quantity}
                          onIncrease={() =>
                            updateCartItem(item.id, item.quantity + 1)
                          }
                          onDecrease={() =>
                            updateCartItem(
                              item.id,
                              Math.max(item.quantity - 1, 1)
                            )
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="mt-6 border-t border-charcoal pt-6">
                  <div className="flex justify-between items-center mb-6">
                    <p className="text-sm font-bold uppercase">total</p>
                    <p className="text-lg font-bold">${cart.totalPrice}</p>
                  </div>
                  <Button
                    variant="default"
                    className="w-full text-lg py-3"
                    onClick={() => (window.location.href = cart.webUrl)}
                  >
                    CHECKOUT
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};
