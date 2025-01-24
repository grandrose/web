import React, { useState } from "react";
import { useTheme } from "@context/ThemeContext";

export const EmailSubmission = ({
  placeholder = "Enter your email",
  buttonLabel = "Submit",
  onSubmit,
  showButton = true,
  background = "dark",
  buttonTheme = "dark",
}) => {
  const { themeName } = useTheme();
  const [statusMessage, setStatusMessage] = useState(null);

  const backgroundCombos = {
    dark: {
      default: "bg-transparent text-cream placeholder-gray-500 border-cream",
      blossom:
        "bg-transparent text-charcoal placeholder-gray-500 border-charcoal",
    },
    light: {
      default: "bg-cream text-charcoal placeholder-gray-400 border-charcoal",
      blossom: "bg-cream text-cream placeholder-gray-400 border-cream",
    },
  };

  const buttonCombos = {
    dark: {
      default:
        "bg-transparent border-2 border-cream text-cream hover:bg-cream hover:text-charcoal disabled:hover:bg-transparent disabled:hover:text-cream",
      blossom:
        "bg-transparent border-2 border-charcoal text-charcoal hover:bg-charcoal hover:text-cream disabled:hover:bg-transparent disabled:hover:text-charcoal",
    },
    light: {
      default:
        "bg-cream border border-charcoal text-charcoal hover:bg-charcoal hover:text-cream",
      blossom:
        "bg-cream border border-cream text-cream hover:bg-cream hover:text-charcoal",
    },
  };

  // const inputStyless = backgroundCombos[background][themeName];
  const buttonStyles = buttonCombos[buttonTheme][themeName];
  const inputStyles =
    background === "dark"
      ? "bg-transparent text-cream placeholder-gray-500 border-cream"
      : "bg-cream text-charcoal placeholder-gray-400 border-charcoal";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    try {
      const response = await fetch("/api/addToMarketing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatusMessage("Successfully signed up for marketing!");
        onSubmit && onSubmit(email);
      } else {
        const errorData = await response.json();
        setStatusMessage(errorData.error || "An error occurred.");
      }
    } catch (error) {
      setStatusMessage("Failed to sign up. Please try again.");
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row items-center justify-center sm:justify-start space-y-2 sm:space-y-0 sm:space-x-2"
      >
        <input
          type="email"
          name="email"
          placeholder={placeholder}
          className={`px-4 py-1 rounded-full border-2 focus:outline-none ${inputStyles}`}
          required
        />
        {showButton && (
          <button
            type="submit"
            className={`px-4 py-1 rounded-full font-medium transition-all duration-200 ${buttonStyles}`}
          >
            {buttonLabel}
          </button>
        )}
      </form>
      {statusMessage && (
        <p className="mt-2 text-sm text-red-900 font-bold">{statusMessage}</p>
      )}
    </div>
  );
};
