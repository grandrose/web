import React from "react";

export const IngredientsNutritionModal = ({
  productName,
  ingredients,
  nutritionFacts,
  onClose,
}) => {
  return (
    // Full-screen backdrop
    <div
      className="
        fixed inset-0 z-50
        flex justify-center
        items-end
        bg-black bg-opacity-50
      "
      // Optional: Close by clicking the backdrop
      onClick={onClose}
    >
      {/* Bottom sheet / modal container */}
      <div
        className="
          w-full
          bg-cream
          h-[80vh]
          rounded-t-xl
          overflow-y-auto
          transform-gpu transition-transform duration-300
          translate-y-0
          p-6
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <div className="flex justify-between items-center mb-24">
          <h3>Ingredients & Nutritional Facts</h3>
          <button
            onClick={onClose}
            className="text-charcoal font-bold text-xl mb-4"
          >
            &times;
          </button>
        </div>
        <div className="flex justify-between items-center px-[16.15vw]">
          <h2 className="text-6xl font-bold mb-4">{productName}</h2>
          <section>
            <h3 className="text-xl font-semibold mb-2">Ingredients</h3>
            <p className="mb-6">{ingredients}</p>
          </section>
          <section>
            <h3 className="text-xl font-semibold mb-2">Nutrition Facts</h3>
            <div className="mb-4">
              {nutritionFacts ? (
                <pre className="whitespace-pre-wrap text-sm leading-6">
                  {nutritionFacts}
                </pre>
              ) : (
                <p className="text-sm">No nutrition facts available.</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
