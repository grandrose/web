import React from "react";

export const Button = ({
  children,
  onClick,
  variant = "default",
  className = "font-medium",
  isSelected = false,
  disabled = false,
  ...props
}) => {
  const baseStyles =
    "rounded-full transition-all duration-200 focus:outline-none border-2 text-md sm:text-[20px]";

  const variants = {
    default:
      "bg-cream text-charcoal hover:bg-transparent hover:text-cream border-cream",
    outline:
      "bg-transparent border-cream text-cream hover:bg-cream hover:text-charcoal",
    danger:
      "bg-transparent text-red-600 border-red-600 hover:bg-red-600 hover:text-charcoal",
    dark: "bg-transparent text-cream border-cream hover:bg-cream hover:text-charcoal",
    light:
      "bg-cream text-charcoal border-charcoal hover:bg-transparent hover:text-cream",
  };

  const selectedStyles = {
    default: "bg-transparent text-cream border-cream",
    outline: "bg-cream text-charcoal border-cream",
    danger: "bg-red-600 text-charcoal border-red-600",
    dark: "bg-cream text-charcoal border-cream",
    light: "bg-transparent text-cream border-cream",
  };

  const disabledStyles = "opacity-50 cursor-not-allowed";

  const appliedStyles = `${baseStyles} ${
    disabled
      ? disabledStyles
      : isSelected
      ? selectedStyles[variant]
      : variants[variant]
  } ${className}`;

  return (
    <button
      onClick={!disabled ? onClick : undefined}
      className={appliedStyles}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
