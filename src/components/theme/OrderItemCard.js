import React from "react";
export const OrderItemCard = ({
  title,
  subtitle,
  price,
  quantity,
  variant,
  imageUrl,
}) => {
  let packNumber = 1;
  if (variant?.title) {
    const match = variant.title.match(/\d+/);
    if (match) {
      packNumber = parseInt(match[0], 10);
    }
  }

  return (
    <div className="w-full max-w-md h-[137px] flex bg-cream rounded-[10px] p-4">
      {/* Image area */}
      <div className="w-[100px] h-[100px] border border-[#7A3434] rounded flex items-center justify-center">
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

      {/* Text info */}
      <div className="ml-4 flex-1 flex flex-col justify-between">
        <div>
          <h2 className="text-charcoal text-md font-medium">
            {title} {subtitle}
          </h2>
          <p className="text-charcoal text-sm mt-4">${price}</p>
        </div>
        {/* Show quantity, if desired */}
        <p className="text-[10px] text-charcoal self-start">
          Quantity: {quantity}
        </p>
      </div>

      <div className="flex flex-col justify-between items-end ml-4">
        <p className="text-charcoal text-sm">{packNumber}/PK</p>
      </div>
    </div>
  );
};
