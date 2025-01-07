import React, { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { useCart } from "../../context/CartContext";
import { CoreButton, ItemCard } from "../theme";
import { formatPrice } from "../../common";

export const MobileCart = ({ isModalOpen, toggleModal }) => {
  const { cart, updateCartItem, removeFromCart, fetchCart } = useCart();
  // const cartRef = useRef(null);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      toggleModal();
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      fetchCart();
    } else {
      document.body.style.overflow = "auto";
    }

    // return () => {
    //   document.body.style.overflow = "auto";
    // };
  }, [isModalOpen, fetchCart]);

  const handleCheckout = () => {
    if (cart?.webUrl) {
      window.location.href = cart.webUrl;
    }
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={handleOverlayClick}
      />

      {/* Cart Content */}
      <div
        // ref={cartRef}
        className="relative bg-cream text-charcoal rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {cart?.lineItems?.length > 0 ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-sm font-medium tracking-wider">my cart</h2>
              <p className="text-sm font-medium">
                items ({cart.lineItems.length})
              </p>
              <button onClick={toggleModal} className="text-charcoal">
                <IoClose size={24} />
              </button>
            </div>

            <div className="flex flex-col gap-4 mb-6">
              {cart.lineItems.map((item) => (
                <ItemCard
                  key={item.id}
                  subtitle={item.title === "bloom" ? "| 2.5mg THC" : null}
                  price={formatPrice(item.variant.price.amount)}
                  quantity={item.quantity}
                  variant={item.variant}
                  imageUrl={item.variant.image?.src || null}
                  id={item.id}
                  onRemove={() => removeFromCart(item.id)}
                  onQuantityChange={(quantity) =>
                    updateCartItem(item.id, quantity)
                  }
                />
              ))}
            </div>

            <div className="border-t border-charcoal pt-4">
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm font-semibold">total</p>
                <p className="text-lg font-bold">
                  ${cart?.totalPrice?.amount || 0}
                </p>
              </div>
              <CoreButton
                label="CHECKOUT"
                onClick={handleCheckout}
                variant="dark"
              />
            </div>
          </>
        ) : (
          <p className="text-center text-sm">Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};
