import React from "react";

export const EmailSubmission = ({
  placeholder = "Enter your email",
  buttonLabel = "Submit",
  onSubmit,
  showButton = true,
  background = "dark",
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(e.target.email.value);
  };

  const inputStyles =
    background === "dark"
      ? "bg-transparent text-cream placeholder-gray-500 border-cream"
      : "bg-cream text-charcoal placeholder-gray-400 border-charcoal";

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
      <input
        type="email"
        name="email"
        placeholder={placeholder}
        className={`px-4 py-2 rounded-full border border-cream focus:outline-none ${inputStyles}`}
      />
      {showButton && (
        <button
          type="submit"
          className="px-4 py-2 rounded-full bg-cream border border-cream text-black hover:bg-charcoal hover:text-cream transition-all duration-200"
        >
          {buttonLabel}
        </button>
      )}
    </form>
  );
};
