import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import defaultCans from "@assets/temp/cans-small.png";
import { blossomGradient, primaryGradient } from "@assets";
import { useTheme } from "../../context";

export const Hero = ({
  variant = "dark",
  reversed = false,
  showOrderButton = false,
  text = "",
  boldWords = [],
  textSize = "text-xl md:text-4xl lg:text-[40px]",
  onOrderClick = null,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const { theme } = useTheme()
  const images = [defaultCans, defaultCans, defaultCans];

  const textBackground = variant === "dark" ? primaryGradient : blossomGradient;
  const textColor = variant === "dark" ? "text-cream" : "text-charcoal";
  const imageBgColor = theme.bodyClasses;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  const sectionBaseClasses =
    "flex flex-col justify-between w-full md:w-1/2 h-auto md:h-[800px] p-6 md:p-12 bg-cover bg-no-repeat bg-center";
  const imageWrapperClasses =
    "flex items-center justify-center w-full md:w-1/2 h-auto md:h-[800px] p-4 md:p-8";

  // Fallback
  const handleOrder = () => {
    if (onOrderClick) {
      onOrderClick();
    } else {
      if (variant === "light") {
        navigate("/shop?product=blossom");
      } else {
        navigate("/shop");
      }
    }
  };

  const parseMessage = (message, boldArr) => {
    if (!message) return null;
    return message.split(" ").map((word, index) => {
      const strippedWord = word.replace(/[^a-zA-Z]/g, "");
      if (boldArr.includes(strippedWord)) {
        return (
          <span className="font-medium" key={index}>
            {word}{" "}
          </span>
        );
      }
      return word + " ";
    });
  };

  const defaultDarkMessage = (
    <h1 className={`${textSize} font-light leading-tight text-center md:text-left`}>
      A <span className="font-medium">functional-dose</span> cannabis beverage
      developed to <span className="font-medium">elevate</span> active
      experiences and <span className="font-medium">amplify</span> recovery.
    </h1>
  );

  const defaultLightMessage = (
    <h1 className={`${textSize} text-center md:text-left`} style={{ lineHeight: "1.1" }}>
      Sip on Blossom formulated <strong>without cannabinoids</strong> with the
      same great benefits.
    </h1>
  );

  const textSection = (
    <div
      className={`${sectionBaseClasses} ${textColor}`}
      style={{ backgroundImage: `url(${textBackground})` }}
    >
      <div className="flex flex-col justify-center flex-grow p-12" >
        {text ? (
          <h1 className={`${textSize} leading-tight text-center md:text-left`} style={{ lineHeight: "1.1" }}>
            {parseMessage(text, boldWords)}
          </h1>
        ) : variant === "dark" ? (
          defaultDarkMessage
        ) : (
          defaultLightMessage
        )}
      </div>

      {showOrderButton && (
        <div className="mt-6 md:mt-0 p-12">
          <button
            onClick={handleOrder}
            className={`py-2 px-6 border-2 rounded-full text-lg md:text-xl font-medium transition
              ${
                variant === "dark"
                  ? "border-cream hover:bg-cream hover:text-charcoal"
                  : "border-charcoal hover:bg-cream hover:text-charcoal"
              }
            `}
          >
            ORDER NOW
          </button>
        </div>
      )}
    </div>
  );

  const imageSection = (
    <div className={`${imageWrapperClasses} ${imageBgColor}`}>
      <div className="rounded-lg overflow-hidden w-[90%] md:w-[700px] md:h-[700px]">
        <img
          src={images[currentSlide]}
          alt={`Slide ${currentSlide + 1}`}
          className="object-contain w-full h-full"
        />
      </div>
    </div>
  );

  return (
    <section
      className={`flex flex-wrap min-h-[800px] ${
        variant === "dark" ? "text-cream" : "text-charcoal"
      }`}
    >
      {reversed ? (
        <>
          {textSection}
          {imageSection}
        </>
      ) : (
        <>
          {imageSection}
          {textSection}
        </>
      )}
    </section>
  );
};
