import { useTheme } from "@context/ThemeContext";
import {
  b12,
  cbg,
  creatine,
  d3,
  plantProtein,
  thc,
  turmeric,
  vitaminC,
} from "../../assets/icons";
import GRIconGarnet from "../../assets/icons/GR-logo-garnet.png";

export const IngredientSection = ({ rose = false }) => {
  const { theme } = useTheme();

  const ingredients = [
    {
      name: "plant protein",
      icon: plantProtein,
      boldPart: ["plant", "protein"],
    },
    { name: "creatine", icon: creatine, boldPart: ["creatine"] },
    { name: "turmeric", icon: turmeric, boldPart: null },
    { name: "vitamin b12", icon: b12, boldPart: null },
    { name: "vitamin c", icon: vitaminC, boldPart: null },
    { name: "vitamin d3", icon: d3, boldPart: null },
    { name: "2mg thc", icon: thc, boldPart: ["thc"] },
    { name: null, icon: rose ? GRIconGarnet : null, boldPart: null },
    { name: "40mg cbg", icon: cbg, boldPart: ["cbg"] },
  ];

  return (
    <section
      className={`${theme.bodyClasses} pt-24 pb-32 px-6 sm:px-12 lg:px-32 w-full`}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8 text-center">
        {ingredients.map(({ name, icon, boldPart }, index) => (
          <div
            key={index}
            className={`flex flex-col items-center ${
              index === ingredients.length - 2 ? "lg:mr-6" : ""
            }`}
          >
            {icon && (
              <div
                className={`w-[50px] h-[50px] flex items-center justify-center mb-4 ${
                  index === ingredients.length - 2 ? "hidden sm:flex" : ""
                }`}
              >
                <img
                  src={icon}
                  alt={`${name || "rose"} Icon`}
                  className="w-full h-full object-contain"
                />
              </div>
            )}
            <span className="text-xl sm:text-4xl font-light">
              {name &&
                name.split(" ").map((word, i) => (
                  <span
                    key={i}
                    className={
                      boldPart && boldPart.includes(word)
                        ? "font-semibold"
                        : "font-normal"
                    }
                  >
                    {word}{" "}
                  </span>
                ))}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
