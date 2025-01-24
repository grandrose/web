import React from "react";
import { useTheme } from "@context/ThemeContext";

export const ProductGif = ({
  src,
  alt = "",
  overlayText = "",
  className = "",
}) => {
  const { themeName } = useTheme();

  const backgroundColor =
    themeName === "blossom"
      ? "rgba(0, 0, 0, 0.08)"
      : "rgba(248, 241, 241, 0.08)";

  const renderTemplate = () => (
    <div
      className={`
        w-full max-w-[500px] h-[625px] max-h-screen
        flex items-center justify-center rounded-lg
        ${themeName === "blossom" ? "text-charcoal" : "text-cream"}
      `}
      style={{ backgroundColor }}
    >
      <p className="text-lg font-semibold text-center px-4">
        Product Preview Coming Soon
      </p>
    </div>
  );

  return (
    <div
      className={`
        relative w-full max-w-[500px] h-[625px] max-h-screen
        overflow-hidden flex items-center justify-center
        ${className}
      `}
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
          <p className="text-xl font-bold text-center bg-black/50 px-3 py-2 rounded text-white">
            {overlayText}
          </p>
        </div>
      )}
    </div>
  );
};
