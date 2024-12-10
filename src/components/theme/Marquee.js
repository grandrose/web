import React from "react";
import Marquee from "react-fast-marquee";
import "./styles/Marquee.css";

export const PPPMarquee = () => {
  const isMobile = window.innerWidth <= 768;
  return isMobile ? (
    <Marquee pauseOnHover speed={25}>
      <p className="text-md font-bold hover:cursor-default text-cream hover:text-rose marquee-text">
        PLANT POWERED PROTEIN
      </p>
      <p className="text-md font-bold mx-4 hover:cursor-default text-cream hover:text-rose marquee-text">
        PLANT POWERED PROTEIN
      </p>
    </Marquee>
  ) : (
    <Marquee autoFill pauseOnHover>
      <p className="text-[1.2vw] font-bold mx-4 hover:cursor-default text-cream hover:text-rose marquee-text">
        PLANT POWERED PROTEIN
      </p>
    </Marquee>
  );
};
