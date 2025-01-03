import React from "react";

export const FullscreenMedia = ({
  assetType,
  src,
  alt = "",
  overlayText = "",
  caption = "",
  className = "",
}) => {
  const renderTemplate = () => (
    <div
      className="absolute inset-0 w-full h-full flex items-center justify-center text-cream"
      style={{ backgroundColor: "rgba(248, 241, 241, 0.08)" }}
    ></div>
  );

  return (
    <div
      className={`relative w-full h-screen overflow-hidden overflow-x-hidden ${className}`}
    >
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
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {overlayText.lineOne && (
            <p className="text-7xl text-cream font-medium text-center px-[16.15vw]">
              {overlayText.lineOne}
            </p>
          )}
          {overlayText.lineTwo && (
            <p className="text-7xl text-cream font-medium text-center px-[16.15vw] mt-4">
              {overlayText.lineTwo}
            </p>
          )}
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
