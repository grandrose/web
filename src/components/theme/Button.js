import React from "react";

export const Button = ({
  children,
  onClick,
  variant = "default",
  className = "",
  ...props
}) => {
  const baseStyles =
    "px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 focus:outline-none";

  const variants = {
    default:
      "bg-cream text-black hover:bg-transparent  hover:text-cream border-2 hover:border-cream",
    outline:
      "bg-transparent text-cream border-2 border-cream hover:bg-cream hover:text-charcoal",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
