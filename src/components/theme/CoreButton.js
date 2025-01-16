import React from "react";

export const CoreButton = ({
  label,
  onClick,
  variant = "dark",
  borderColor = "border-charcoal",
}) => {
  const themedStyles = `${
    variant === "dark"
      ? `bg-charcoal text-cream font-medium text-2xl hover:bg-cream hover:text-charcoal ${borderColor}`
      : `bg-cream text-charcoal font-medium text-2xl hover:bg-charcoal hover:text-cream ${borderColor}`
  }`;

  return (
    <button
      onClick={onClick}
      className={`w-full h-[50px] rounded-full border-2 transition-all duration-200 ${themedStyles}`}
    >
      {label}
    </button>
  );
};
