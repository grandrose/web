import React from "react";

export const Button = ({
  children,
  onClick,
  variant = "default",
  className = "",
  isSelected = false,
  disabled = false,
  ...props
}) => {
  const baseStyles =
    "px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 focus:outline-none border-2";

  const variants = {
    default:
      "bg-cream text-charcoal hover:bg-transparent hover:text-cream border-2 hover:border-cream disabled:hover:bg-transparent disabled:hover:text-cream",
    outline:
      "bg-transparent border-2 border-cream hover:bg-cream hover:text-charcoal disabled:hover:bg-transparent disabled:hover:text-cream",
  };

  const disabledStyles = "opacity-50 cursor-not-allowed";
  const selectedStyles = "bg-cream text-charcoal border-cream";
  const slashStyles =
    "relative after:content-[''] after:absolute after:left-[3px] after:top-1/2 after:w-[94%] after:h-0 after:border-b-2 after:border-cream after:transform after:-translate-y-1/2 after:rotate-[-20deg]";

  const appliedStyles = `${baseStyles} ${
    disabled
      ? `${disabledStyles} ${slashStyles}`
      : isSelected
      ? `${selectedStyles}`
      : variants[variant]
  } ${className}`;

  isSelected && console.log("appliedStyles", appliedStyles);

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
