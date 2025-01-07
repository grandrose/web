import React from "react";
import { useCart } from "../../context/CartContext";
import { QuantitySelector } from "./QuantitySelector";

export const ItemCard = ({
  id,
  title,
  subtitle,
  price,
  quantity,
  variant,
  imageUrl,
}) => {
  // This is to parse the int from the variant title. eg; 4-PACK
  const packNumber = parseInt(variant.title.match(/\d+/)[0], 10);
  const { removeFromCart } = useCart();

  return (
    <div className="w-full max-w-md h-[137px] flex bg-cream rounded-[10px] p-4">
      <div
        className="w-[100px] h-[100px] rounded flex items-center justify-center"
        style={{ backgroundColor: "rgba(217, 217, 217, 1)" }}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover rounded"
          />
        ) : (
          <div className="text-rose text-sm font-medium">Image</div>
        )}
      </div>

      <div className="ml-4 flex-1 flex flex-col justify-between">
        <div>
          <h2 className="text-charcoal text-md font-medium">
            {title} {subtitle}
          </h2>
          <p className="text-charcoal text-sm mt-4">{price}</p>
        </div>
        <button
          onClick={() => removeFromCart(id)}
          className="text-[10px] text-charcoal self-start"
        >
          x remove
        </button>
      </div>

      <div className="flex flex-col justify-between items-end ml-4">
        <p className="text-charcoal text-sm">{packNumber}/PK</p>
        {!variant.available && <p className="text-[#8b0d0d]">out of stock</p>}
        <QuantitySelector
          initial={quantity}
          itemID={id}
          disabled={!variant.available}
        />
      </div>
    </div>
  );
};
