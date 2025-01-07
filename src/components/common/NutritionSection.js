import { cbg } from "../../assets/icons";

export const NutritionSection = () => {
  const ingredients = [
    {
      name: "dairy-free",
      icon: cbg,
      boldPart: null,
    },
    {
      name: "gluten-free",
      icon: cbg,
      boldPart: null,
    },
    {
      name: "non-gmo",
      icon: cbg,
      boldPart: null,
    },
    {
      name: "sustainable",
      icon: cbg,
      boldPart: null,
    },
    {
      name: "vegan organic",
      icon: cbg,
      boldPart: null,
    },
    {
      name: "hemp-derived",
      icon: cbg,
      boldPart: null,
    },
  ];

  return (
    <section className="text-cream pt-24 pb-32 px-6 sm:px-12 lg:px-32 w-full">
      <div className="grid grid-cols-3 gap-y-28 text-center">
        {ingredients.map(({ name, icon, boldPart }, index) => (
          <div key={index} className={`flex flex-col items-center`}>
            {name && icon && (
              <div className="w-[40px] h-[40px] flex items-center justify-center mb-4">
                <img
                  src={icon}
                  alt={`${name} Icon`}
                  className="w-full h-full object-contain"
                />
              </div>
            )}
            <span className="text-4xl font-light">
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
