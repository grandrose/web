import React from "react";

export const CoreButton = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-[500px] h-[60px] text-[25px] rounded-full bg-cream text-black hover:bg-rose hover:text-cream transition-all duration-200"
    >
      {label}
    </button>
  );
};
