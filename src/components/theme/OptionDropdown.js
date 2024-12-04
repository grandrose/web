import React, { useState } from "react";

export const OptionDropdown = ({
  label = "Ingredients",
  options = [],
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 rounded-full bg-transparent text-cream border border-cream"
      >
        {label}
      </button>
      {isOpen && (
        <ul className="absolute left-0 mt-2 bg-charcoal text-cream border border-gray-300 rounded-lg shadow-lg">
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => {
                setIsOpen(false);
                if (onSelect) onSelect(option);
              }}
              className="px-4 py-2 hover:bg-cream hover:text-charcoal cursor-pointer rounded-lg"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

/*
EXAMPLE USAGE

<Dropdown
  label="Ingredients"
  options={["Option 1", "Option 2", "Option 3"]}
  onSelect={(option) => console.log("Selected:", option)}
/>

*/
