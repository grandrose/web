import React from "react";
import Marquee from "react-fast-marquee";

export const PPPMarquee = () => {
  return (
    <Marquee loop={0} autoFill>
      <p className="text-[1.2vw] font-bold mx-4">PLANT POWERED PROTEIN</p>
    </Marquee>
  );
};
