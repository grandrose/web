import React from "react";

export const VideoSection = ({
  mediaType = "video",
  src,
  fallbackText = "Media coming soon",
}) => {
  return (
    <div className="relative w-full h-[700px] bg-charcoal text-cream">
      <div className="w-[calc(100%-200px)] mx-auto h-full border border-cream rounded-lg flex items-center justify-center overflow-hidden">
        {src ? (
          mediaType === "video" ? (
            <video
              src={src}
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
            />
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
    </div>
  );
};
