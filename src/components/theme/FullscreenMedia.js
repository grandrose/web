import React from "react";

export const FullscreenMedia = ({
  assetType,
  src,
  alt = "",
  overlayText = "", // New prop for center overlay text
  caption = "",
  className = "",
}) => {
  // Placeholder template when no source is provided
  const renderTemplate = () => (
    <div
      className="absolute inset-0 w-full h-full flex items-center justify-center text-cream"
      style={{ backgroundColor: "rgba(248, 241, 241, 0.08)" }}
    ></div>
  );

  return (
    <div className={`relative w-screen h-screen overflow-hidden ${className}`}>
      {/* Media */}
      {!src && renderTemplate()}
      {src && assetType === "photo" && (
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      {src && assetType === "video" && (
        <video
          src={src}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      {src && assetType === "gif" && (
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Centered Overlay Text */}
      {overlayText && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-3xl text-white font-bold text-center px-4">
            {overlayText}
          </p>
        </div>
      )}

      {/* Caption at Bottom */}
      {src && caption && (
        <div className="absolute bottom-4 w-full text-center text-white text-sm bg-black/50 py-2">
          {caption}
        </div>
      )}
    </div>
  );
};
