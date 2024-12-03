import React, { useState } from "react";

export const QuantitySelector = ({ initial = 1, onChange }) => {
  const [quantity, setQuantity] = useState(initial);

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      if (onChange) onChange(quantity - 1);
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
    if (onChange) onChange(quantity + 1);
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={handleDecrement}
        className="w-8 h-8 flex items-center justify-center border border-white rounded-full text-white hover:bg-gray-700"
      >
        -
      </button>
      <span>{quantity}</span>
      <button
        onClick={handleIncrement}
        className="w-8 h-8 flex items-center justify-center border border-white rounded-full text-white hover:bg-gray-700"
      >
        +
      </button>
    </div>
  );
};
