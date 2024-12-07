import React from "react";

export const ProductGif = ({
  src,
  alt = "",
  overlayText = "",
  className = "",
}) => {
  const renderTemplate = () => (
    <div
      className="w-[500px] h-[625px] flex items-center justify-center text-gray-800 rounded-lg"
      style={{ backgroundColor: "rgba(248, 241, 241, 0.08)" }}
    >
      <p className="text-lg font-semibold text-center px-4 text-cream">
        Product Preview Coming Soon
      </p>
    </div>
  );

  return (
    <div
      className={`relative w-[500px] h-[625px] overflow-hidden flex items-center justify-center ${className}`}
    >
      {!src && renderTemplate()}
      {src && (
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover rounded-lg"
        />
      )}

      {overlayText && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-xl text-white font-bold text-center bg-black/50 px-3 py-2 rounded">
            {overlayText}
          </p>
        </div>
      )}
    </div>
  );
};
