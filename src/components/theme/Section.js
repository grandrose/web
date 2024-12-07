import React from "react";

export const Section = ({ children, backgroundImage, className = "" }) => {
  const sectionStyles = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div
      className={`relative w-full min-h-[50vh] p-8 flex flex-col items-center justify-center ${className}`}
      style={sectionStyles}
    >
      {children}
    </div>
  );
};
