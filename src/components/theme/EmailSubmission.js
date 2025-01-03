import React, { useState } from "react";

export const EmailSubmission = ({
  placeholder = "Enter your email",
  buttonLabel = "Submit",
  onSubmit,
  showButton = true,
  background = "dark",
  buttonTheme = "dark",
}) => {
  const [statusMessage, setStatusMessage] = useState(null);

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
      } else {
        const errorData = await response.json();
        setStatusMessage(errorData.error || "An error occurred.");
      }
    } catch (error) {
      setStatusMessage("Failed to sign up. Please try again.");
    }
  };

  const inputStyles =
    background === "dark"
      ? "bg-transparent text-cream placeholder-gray-500 border-cream"
      : "bg-cream text-charcoal placeholder-gray-400 border-charcoal";

  const buttonStyles =
    buttonTheme === "dark"
      ? "bg-transparent border-2 border-cream text-cream hover:bg-cream hover:text-charcoal disabled:hover:bg-transparent disabled:hover:text-cream"
      : "bg-cream border border-charcoal text-charcoal hover:bg-charcoal hover:text-cream";

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
          className={`px-4 py-1 rounded-full border focus:outline-none ${inputStyles}`}
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
