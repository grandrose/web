import React from "react";
import IconGarnet from "../../assets/icons/IconGarnet";

export const StoreCard = () => {
  return (
    <div
      className="w-full max-w-md h-[150px] flex flex-col border-2 border-rose rounded-lg p-4 relative"
      style={{ backgroundColor: "rgba(14, 14, 14, 0.48)" }}
    >
      <div className="flex justify-between items-start">
        <div>
          <h2 className="font-bold text-2xl pb-2">Eden Prairie Liquor</h2>
          <p className="text-lg">9999 West North</p>
          <p className="text-lg">City, State 99999</p>
        </div>
        <IconGarnet className="w-[25px] h-[25px]" />
      </div>
      <p className="absolute bottom-4 right-4 text-md text-cream">
        (1.9 mi away)
      </p>
    </div>
  );
};
