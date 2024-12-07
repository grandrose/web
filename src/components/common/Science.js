import React from "react";
import { Pvg } from "./shared";

export const Science = () => {
  const sources = [
    "path/to/your/video1.mp4",
    "path/to/your/video2.mp4",
    "path/to/your/video3.mp4",
  ];

  return (
    <div
      className="bg-rose p-8 text-cream"
      style={{
        backgroundImage: "url(/images/gr-garnet-noise.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-screen-lg mx-auto">
        <h2 className="text-2xl font-bold mb-4">our science</h2>
        <p className="text-lg mb-4">
          Crafted for the discerning tastes of individuals committed to
          continual self-improvement,{" "}
          <span className="font-bold">grand rose</span> emerged from the shared
          vision of three friends. Frustrated by the inconsistent and often
          overwhelming intensity of many cannabinoid products in their quest for
          a healthy lifestyle, they were driven to find a solution.
        </p>
        <p className="text-lg mb-4">
          <span className="font-bold">grand rose</span> is a breakthrough
          protein powder, scientifically formulated with an ingredient and
          cannabinoid matrix prioritizing functional recovery and well-being,
          while ensuring a balanced experience for all.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-40 mt-8 w-auto">
          {sources.map((src, index) => (
            <Pvg key={index} src={src} />
          ))}
        </div>
      </div>
    </div>
  );
};
