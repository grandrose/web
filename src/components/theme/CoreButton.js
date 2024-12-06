import React from "react";

export const CoreButton = ({ label, onClick, variant = "dark", className }) => {
  const themedStyles = `${
    variant === "dark"
      ? "bg-charcoal text-cream border-charcoal hover:bg-cream hover:text-charcoal"
      : "bg-cream text-charcoal border-cream hover:bg-charcoal hover:text-cream"
  }`;

  return (
    <button
      onClick={onClick}
      className={`w-full h-[60px] text-[25px] rounded-full border-2 transition-all duration-200 ${themedStyles} ${className}`}
    >
      {label}
    </button>
  );
};
