import { useState } from "react";

export const ContentDropdown = ({
  name,
  ingredients,
  contents,
  nutritionFacts,
  warnings,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCard = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? "max-w-4xl" : "max-w-lg"
        }`}
      >
        <button
          onClick={toggleCard}
          className={`w-full px-4 py-2 flex justify-between items-center bg-charcoal text-cream rounded-t-[18px] transition-all duration-300 ease-in-out border-2 border-cream shadow-lg ${
            isOpen ? "rounded-b-none" : "rounded-[18px]"
          }`}
          // style={{ borderBottomLeftRadius: isOpen ? "0" : "0.375rem" }}
        >
          <span>INGREDIENTS & NUTRITION FACTS</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className={`w-6 h-6 transition-transform duration-300 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {isOpen && (
          <div className="w-full bg-charcoal text-cream p-[50px] rounded-b-[18px] shadow-md border-2 border-cream border-t-0 grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <h3 className="text-cream text-[40px] font-semibold mb-[85px]">
                {name}
              </h3>
              <p className="text-[15px] mb-[85px]">
                <p className="text-[15px] text-cream font-bold inline mr-1 ">
                  Ingredients:
                </p>
                {ingredients}
              </p>
              <p className="text-[15px] mb-[18px]">
                <p className="text-[15px] text-cream font-bold inline mr-1 ">
                  Contains:
                </p>
                {contents}
              </p>
              {warnings && (
                <p className="text-[15px]">
                  <p className="text-[15px] text-cream font-bold inline mr-1">
                    Warning:
                  </p>
                  {warnings}
                </p>
              )}
            </div>
            <div className="flex justify-center items-center">
              <div className="w-full h-full bg-cream flex justify-center items-center text-charcoal border-2 border-cream">
                INSERT NUTRITION FACTS
              </div>
            </div>
            <div className="col-span-3">
              <p className="text-cream font-semibold mt-6">grand rose</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
