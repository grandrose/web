import React, { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { useCart } from "../../context/CartContext";
import { CoreButton, ItemCard } from "../theme";
import { formatPrice } from "../../common";

export const Cart = ({ isModalOpen, toggleModal }) => {
  const { cart, updateCartItem, removeFromCart, fetchCart } = useCart();
  const cartRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        isModalOpen &&
        cartRef.current &&
        !cartRef.current.contains(event.target)
      ) {
        toggleModal();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isModalOpen, toggleModal]);

  useEffect(() => {
    if (isModalOpen) {
      fetchCart();
    }
  }, [isModalOpen]);

  const handleCheckout = () => {
    if (cart?.webUrl) {
      window.location.href = cart.webUrl;
    }
  };

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center sm:justify-end px-12 py-9 z-50">
          <div
            ref={cartRef}
            className="relative bg-cream text-charcoal rounded-lg w-11/12 sm:w-full max-w-lg p-8"
          >
            {cart?.lineItems?.length > 0 ? (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-sm font-medium">my cart</h2>
                  <p className="text-sm font-medium">
                    items ({cart.lineItems.length})
                  </p>
                  <button onClick={toggleModal} className=" text-charcoal">
                    <IoClose size={24} />
                  </button>
                </div>

                <div className="flex flex-col gap-4 mb-6">
                  {cart.lineItems.map((item) => (
                    <div key={item.id}>
                      <ItemCard
                        title={item.title}
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
                    </div>
                  ))}
                </div>
                {/* border-t border-charcoal  if we need the line back */}
                <div className="pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-sm font-semibold">total</p>
                    <p className="text-lg font-bold">
                      {formatPrice(cart.totalPrice.amount) || 0}
                    </p>
                  </div>
                  <CoreButton
                    label="CHECKOUT"
                    onClick={handleCheckout}
                    variant="light"
                  />
                </div>
              </>
            ) : (
              <p className="text-center text-sm">Your cart is empty.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};
