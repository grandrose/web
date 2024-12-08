import React from "react";

export const Media = ({ src, type = "photo", className = "" }) => {
  return (
    <div
      className={`w-[400px] h-[400px] rounded-[10px] overflow-hidden border border-cream flex items-center justify-center text-cream ${className}`}
      style={{ backgroundColor: "rgba(248, 241, 241, 0.08)" }}
    >
      {src ? (
        type === "photo" ? (
          <img src={src} alt="Media" className="w-full h-full object-cover" />
        ) : type === "video" ? (
          <video
            src={src}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={src}
            alt="GIF Media"
            className="w-full h-full object-cover"
          />
        )
      ) : (
        <span className="text-center text-sm font-medium">
          Media Coming Soon
        </span>
      )}
    </div>
  );
};
