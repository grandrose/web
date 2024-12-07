import React from "react";

export const CoreButton = ({ label, onClick, variant = "dark", className }) => {
  const themedStyles = `${
    variant === "dark"
      ? "bg-charcoal text-cream font-medium text-2xl border-charcoal hover:bg-cream hover:text-charcoal"
      : "bg-cream text-charcoal font-medium text-2xl border-cream hover:bg-charcoal hover:text-cream"
  }`;

  return (
    <button
      onClick={onClick}
      className={`w-full h-[50px] rounded-full border-2 transition-all duration-200 ${themedStyles} ${className}`}
    >
      {label}
    </button>
  );
};
