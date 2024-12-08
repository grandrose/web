import React, { useState } from "react";
import { useCart } from "../../context/CartContext";

export const QuantitySelector = ({
  initial = 1,
  variant = "dark",
  itemID,
  disabled = false,
}) => {
  const [quantity, setQuantity] = useState(initial);
  const { updateCartItem, removeFromCart } = useCart();

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      updateCartItem(itemID, quantity - 1);
    } else {
      removeFromCart(itemID);
    }
  };

  const handleIncrement = () => {
    if (!disabled) {
      setQuantity(quantity + 1);
      updateCartItem(itemID, quantity + 1);
    }
  };

  const themedStyles = `${
    variant === "dark"
      ? "border-charcoal text-charcoal"
      : "border-cream text-cream"
  }`;

  return (
    <div
      className={`flex items-center justify-center w-fit border rounded-full ${themedStyles}`}
    >
      <button
        onClick={handleDecrement}
        className={`w-8 h-8 flex items-center justify-center rounded-full hover:bg-cream hover:text-charcoal ${themedStyles}`}
      >
        -
      </button>
      <p className="w-12 text-center mx-2 font-extrabold">{quantity}</p>
      <button
        onClick={handleIncrement}
        disabled={disabled}
        className={`w-8 h-8 flex items-center justify-center rounded-full ${
          disabled
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-cream hover:text-charcoal"
        } ${themedStyles}`}
      >
        +
      </button>
    </div>
  );
};
