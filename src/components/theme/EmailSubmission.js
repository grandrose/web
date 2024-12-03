import React from "react";

export const EmailSubmission = ({
  placeholder = "Enter your email",
  buttonLabel = "Submit",
  onSubmit,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(e.target.email.value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
      <input
        type="email"
        name="email"
        placeholder={placeholder}
        className="px-4 py-2 rounded-full border border-gray-300 bg-transparent text-white placeholder-gray-500 focus:outline-none"
      />
      <button
        type="submit"
        className="px-4 py-2 rounded-full bg-white text-black hover:bg-gray-300 transition-all duration-200"
      >
        {buttonLabel}
      </button>
    </form>
  );
};
