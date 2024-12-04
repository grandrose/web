import React from "react";
import { Pvg } from "./shared";

export const Story = () => {
  return (
    <div
      className="bg-rose p-8 text-cream"
      style={{
        backgroundImage: "url(/images/gr-garnet-noise.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col lg:flex-row justify-between items-start mx-12 my-12">
        <div className="lg:w-2/3 mx-36">
          <h2 className="text-2xl font-bold mb-4">our story</h2>
          <p className="text-lg mb-4">
            Crafted for the discerning tastes of individuals committed to
            continual self-improvement,{" "}
            <span className="font-bold">grand rose</span> emerged from the
            shared vision of three friends. Frustrated by the inconsistent and
            often overwhelming intensity of many cannabinoid products in their
            quest for a healthy lifestyle, they were driven to find a solution.
          </p>
          <p className="text-lg">
            <span className="font-bold">grand rose</span> is a breakthrough
            protein powder, scientifically formulated with an ingredient and
            cannabinoid matrix prioritizing functional recovery and well-being,
            while ensuring a balanced experience for all.
          </p>
        </div>
        <Pvg src="" />
      </div>
    </div>
  );
};
