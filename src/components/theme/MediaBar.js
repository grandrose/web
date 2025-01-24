import React from "react";
import { useTheme } from "@context/ThemeContext";

export const MediaBar = ({ src, type = "image" }) => {
  const { theme } = useTheme();

  return (
    <section className={`${theme.bodyClasses} py-12 px-6 sm:px-12 lg:px-32`}>
      <div className="w-full flex justify-center">
        <div
          className="w-full max-w-[1240px] h-[320px] flex items-center justify-center mb-8 overflow-hidden bg-black rounded-md"
          style={{ backgroundColor: "rgba(248, 241, 241, 0.08)" }}
        >
          {src ? (
            type === "video" ? (
              <video
                src={src}
                autoPlay
                loop
                muted
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={src}
                alt="Media Content"
                className="w-full h-full object-cover"
              />
            )
          ) : (
            <div className="w-full h-full flex items-center justify-center w-[1240px]">
              <span className="text-lg">Media coming soon</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
