import React from "react";
import { useTheme } from "@context/ThemeContext";

export const Button = ({
  children,
  onClick,
  variant = "default",
  className = "font-medium",
  isSelected = false,
  disabled = false,
  ...props
}) => {
  const { themeName, theme } = useTheme();

  const base =
    "rounded-full transition-all duration-200 focus:outline-none border-2 text-md sm:text-[20px]";
  const disabledStyles = "opacity-50 cursor-not-allowed";

  const combos = {
    default: {
      default:
        "bg-cream text-charcoal border-cream hover:bg-transparent hover:text-cream hover:border-cream",
      blossom:
        "bg-charcoal text-cream border-charcoal hover:bg-transparent hover:text-charcoal hover:border-charcoal",
    },
    outline: {
      default:
        "bg-transparent text-cream border-cream hover:bg-cream hover:text-charcoal hover:border-cream",
      blossom:
        "bg-transparent text-charcoal border-charcoal hover:bg-charcoal hover:text-cream hover:border-cream",
    },
    danger: {
      default:
        "bg-transparent text-red-600 border-red-600 hover:bg-red-600 hover:text-charcoal",
      blossom:
        "bg-transparent text-red-600 border-red-600 hover:bg-red-600 hover:text-charcoal",
    },
    dark: {
      default:
        "bg-transparent text-charcoal border-charcoal hover:bg-charcoal hover:text-cream",
      blossom:
        "bg-transparent text-cream border-cream hover:bg-cream hover:text-charcoal",
    },
    light: {
      default:
        "bg-cream text-charcoal border-cream hover:bg-transparent hover:text-cream hover:border-cream",
      blossom:
        "bg-charcoal text-cream border-charcoal hover:bg-transparent hover:text-charcoal hover:border-charcoal",
    },
  };

  const selected = {
    default: {
      default: "bg-transparent text-cream border-cream",
      blossom: "bg-transparent text-charcoal border-charcoal",
    },
    outline: {
      default: "bg-cream text-charcoal border-cream",
      blossom: "bg-charcoal text-cream border-charcoal",
    },
    danger: {
      default: "bg-red-600 text-charcoal border-red-600",
      blossom: "bg-red-600 text-charcoal border-red-600",
    },
    dark: {
      default: "bg-charcoal text-cream border-charcoal",
      blossom: "bg-cream text-charcoal border-cream",
    },
    light: {
      default: "bg-transparent text-cream border-cream",
      blossom: "bg-transparent text-charcoal border-charcoal",
    },
  };

  const final = disabled
    ? `${base} ${disabledStyles}`
    : isSelected
    ? `${base} ${selected[variant][themeName]}`
    : `${base} ${combos[variant][themeName]}`;

  return (
    <button
      onClick={!disabled ? onClick : undefined}
      className={`
        ${className}
        ${final}
      `}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
