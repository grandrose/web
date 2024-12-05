import React from "react";
import "./styles/Marquee.css";

export const Marquee = ({
  text = "PLANT POWERED PROTEIN",
  speed = 20,
  direction = "left",
}) => {
  return (
    <section className="marquee">
      <div
        className={`marquee-track ${
          direction === "right" ? "marquee-track-right" : "marquee-track-left"
        }`}
        style={{ animationDuration: `${speed}s` }}
      >
        {[...Array(15)].map((_, index) => (
          <React.Fragment key={`first-${index}`}>
            <p className="marquee-text">{text}</p>
          </React.Fragment>
        ))}
        {[...Array(15)].map((_, index) => (
          <React.Fragment key={`second-${index}`}>
            <p className="marquee-text">{text}</p>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};
