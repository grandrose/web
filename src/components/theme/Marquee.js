import React from "react";
import Marquee from "react-fast-marquee";
import "./styles/Marquee.css"; // Make sure to import the CSS file where the ::selection styles are defined

export const PPPMarquee = () => {
  return (
    <Marquee loop={0} autoFill pauseOnHover>
      <p className="text-[1.2vw] font-bold mx-4 hover:cursor-default text-cream hover:text-rose marquee-text">
        PLANT POWERED PROTEIN
      </p>
    </Marquee>
  );
};
