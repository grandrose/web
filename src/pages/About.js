import React from "react";
import gradiant from "../assets/backgrounds/gr-core-gradient.png";
import {
  FullscreenMedia,
  Section,
  ProductGif,
  Button,
} from "../components/theme";
import { useNavigate } from "react-router-dom";

export const About = () => {
  const navigate = useNavigate();

  const handleOrderClick = () => {
    navigate("/shop");
  };

  return (
    <>
      <FullscreenMedia
        assetType="photo"
        src=""
        overlayText="grand rose text overlay example"
      />
      <Section backgroundImage={gradiant}>
        <div className="h-[49.5vh] flex items-center justify-center">
          <h1 className="text-cream font-bold text-xl"></h1>
        </div>
      </Section>
      <section className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 lg:gap-16 px-6 lg:px-16 py-8">
        <div className="flex-1 text-center lg:text-left pl-16">
          <div className="py-32">
            <Button onClick={handleOrderClick}>ORDER NOW</Button>
          </div>
          <h2 className="text-3xl font-bold text-cream mb-4">
            closerline + shop call to action
          </h2>
          <p className="text-lg text-cream mb-6">
            placeholder text on the benefits in short form, third tier
            explanation of information to draw you back to the shop page and
            checkout
          </p>
        </div>
        <div className="flex-1 flex justify-center">
          <ProductGif />
        </div>
      </section>
    </>
  );
};
