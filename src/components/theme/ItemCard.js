import React from "react";

export const ItemCard = ({ title, subtitle, price, quantity, imageUrl }) => {
  return (
    <div className="w-[475px] h-[137px] flex items-center bg-[#F8F1F1] rounded-[10px] shadow-md p-4">
      <div className="w-[80px] h-[80px] border border-[#8B0000] rounded flex items-center justify-center">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover rounded"
          />
        ) : (
          <div className="text-[#8B0000] text-sm font-medium">Image</div>
        )}
      </div>
      <div className="ml-4 flex-1">
        <h2 className="text-black text-lg font-semibold">{title}</h2>
        <p className="text-gray-600 text-sm">{subtitle}</p>
        <p className="text-black font-bold mt-1">${price}</p>
      </div>
      <div className="text-right">
        <p className="text-gray-600 text-sm">{quantity}/PK</p>
      </div>
    </div>
  );
};
