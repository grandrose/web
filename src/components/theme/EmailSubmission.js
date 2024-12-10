import React from "react";

export const EmailSubmission = ({
  placeholder = "Enter your email",
  buttonLabel = "Submit",
  onSubmit,
  showButton = true,
  background = "dark",
  buttonTheme = "dark",
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(e.target.email.value);
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
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row items-center justify-center sm:justify-start space-y-2 sm:space-y-0 sm:space-x-2"
    >
      <input
        type="email"
        name="email"
        placeholder={placeholder}
        className={`px-4 py-2 rounded-full border focus:outline-none ${inputStyles}`}
      />
      {showButton && (
        <button
          type="submit"
          className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${buttonStyles}`}
        >
          {buttonLabel}
        </button>
      )}
    </form>
  );
};
