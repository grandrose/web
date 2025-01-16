import React from "react";
import GRIconGarnet from "@assets/icons/GR-logo-garnet.png";

export const IngredientsNutritionModal = ({
  productName,
  ingredients,
  nutritionFacts, //TODO
  onClose,
}) => {
  return (
    <div
      className="
        fixed inset-0 z-50
        flex justify-center
        items-end
        bg-black bg-opacity-50
      "
      onClick={onClose}
    >
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
        <div className="flex justify-between items-center mb-24">
          <p />
          <button
            onClick={onClose}
            className="text-charcoal font-bold text-xl mb-4"
          >
            &times;
          </button>
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-8 px-[16.15vw]">
          <section className="md:w-1/2">
            <div className="mb-6">
              <div className="flex mb-6">
                <h2 className="text-[80px] leading-none">{productName}</h2>
                <div className="ml-4 -translate-y-6 -translate-x-2">
                  <img
                    src={GRIconGarnet}
                    alt="Grand Rose Icon"
                    className="w-[25px] h-[25px]"
                  />
                </div>
              </div>
              <hr className="border-charcoal" />
              <h3 className="text-xl font-semibold my-2">Ingredients</h3>
              <div className="flex flex-row">
                <section className="py-6">
                  <p className="mb-6 uppercase">{ingredients}</p>
                </section>
                <section className="py-6">
                  <p>
                    * Not a significant source of saturated fat, trans fat,
                    cholesterol, dietary fiber, total sugars, added sugars,
                    vitamin D, calcium and iron
                  </p>
                </section>
              </div>
            </div>
          </section>
          <section className="md:w-auto">
            <div className="mb-4">
              <NutritionLabel {...testNutritionData} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

const testNutritionData = {
  servingSize: "12 oz (355mL)",
  servingsPerContainer: "1",
  calories: 20,
  nutrients: [
    {
      name: "Total Fat",
      value: "0g",
      dailyValue: "0%",
      subcategories: [
        { name: "Saturated Fat", value: "0g" },
        { name: "Trans Fat", value: "0g" },
      ],
    },
    { name: "Sodium", value: "10mg", dailyValue: "0%" },
    {
      name: "Total Carbohydrate",
      value: "1g",
      dailyValue: "0%",
      subcategories: [{ name: "Dietary Fiber", value: "0g" }],
    },
    { name: "Protein", value: "4g", dailyValue: "8%" },
  ],
};

const NutritionLabel = ({
  servingSize,
  servingsPerContainer,
  calories,
  nutrients,
}) => {
  return (
    <div
      className="
        w-full max-w-xs
        sm:max-w-sm
        border-4 border-black
        bg-white text-black
        font-sans p-2
      "
    >
      <h4 className="text-2xl sm:text-3xl font-extrabold border-b-8 border-black pb-2 mb-4 uppercase">
        Nutrition Facts
      </h4>
      <div className="text-sm pb-1">
        <span>Servings Per Container</span>
        <span className="float-right">{servingsPerContainer}</span>
      </div>
      <div className="text-sm border-b border-gray-500 pb-2 mb-2">
        <span>Serving Size</span>
        <span className="float-right font-bold">{servingSize}</span>
      </div>
      <div className="text-3xl sm:text-4xl font-extrabold border-b border-black pb-2 mb-4">
        Calories <span className="float-right">{calories}</span>
      </div>
      <div className="text-sm space-y-2">
        {nutrients.map((nutrient, index) => (
          <div key={index} className="border-b border-gray-300 pb-1">
            <div className="flex justify-between">
              <span>
                {nutrient.name} {nutrient.value}
              </span>
              <span>
                <span className="text-gray-500">{nutrient.dailyValue}</span>
              </span>
            </div>
            {nutrient.subcategories?.map((sub, subIndex) => (
              <div key={subIndex} className="flex justify-between pl-4 text-xs">
                <span>
                  {sub.name} {sub.value}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <p className="text-[10px] sm:text-xs mt-4">
        * The % Daily Value (DV) tells you how much a nutrient in a serving of
        food contributes to a daily diet. 2,000 calories a day is used for
        general nutrition advice.
      </p>
    </div>
  );
};
