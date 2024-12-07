import React from "react";

export const VideoSection = () => {
  return (
    <div className="relative w-full h-[700px] bg-charcoal text-cream">
      {/* Video Container */}
      <div className="w-[calc(100%-200px)] mx-auto h-full border border-cream rounded-lg flex items-center justify-center">
        {/* Placeholder Content */}
        <div className="text-center text-sm">
          <p>VIDEO</p>
          <p className="text-gray-400">[1240x700]</p>
          <p className="mt-4 text-gray-400">
            Primary brand video and/or render web header asset
          </p>
        </div>
      </div>
    </div>
  );
};
