import React from "react";

export const VideoSection = ({
  mediaType = "video",
  src,
  fallbackText = "Media coming soon",
  overlayText,
}) => {
  return (
    <div className="relative w-full h-[700px] bg-transparent text-cream">
      <div className="w-full sm:w-[calc(100%-200px)] mx-auto h-full border border-cream rounded-lg flex items-center justify-center overflow-hidden">
        {src ? (
          mediaType === "video" ? (
            <div className="relative w-full h-full">
              <video
                src={src}
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              />
              <div
                className="absolute inset-0"
                onClick={(e) => e.preventDefault()}
              />
            </div>
          ) : mediaType === "photo" || mediaType === "image" ? (
            <img src={src} alt="Media" className="w-full h-full object-cover" />
          ) : mediaType === "gif" ? (
            <img src={src} alt="GIF" className="w-full h-full object-cover" />
          ) : (
            <div className="text-center text-sm">
              <p>Unsupported Media Type</p>
            </div>
          )
        ) : (
          <div className="text-center text-sm">
            <p>{fallbackText}</p>
          </div>
        )}
      </div>
      {overlayText && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-4xl sm:text-6xl text-cream font-medium text-center px-4">
            {overlayText}
          </p>
        </div>
      )}
    </div>
  );
};
