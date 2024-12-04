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
    <div className="flex items-center space-x-2 border border-cream rounded-full">
      <button
        onClick={handleDecrement}
        className="w-8 h-8 flex items-center justify-center rounded-full text-cream hover:bg-cream hover:text-charcoal"
      >
        -
      </button>
      <p className="w-8 text-center">{quantity}</p>
      <button
        onClick={handleIncrement}
        className="w-8 h-8 flex items-center justify-center rounded-full text-cream hover:bg-cream hover:text-charcoal"
      >
        +
      </button>
    </div>
  );
};
