import React from "react";
import { useNavigate } from "react-router-dom";
import gradiant from "../assets/backgrounds/gr-core-gradient.png";
import PlaceholderVideo from "../assets/temp/template-video.mp4";
import {
  Button,
  FullscreenMedia,
  Media,
  ProductGif,
  Section,
} from "../components/theme";
import "./styles/Highlight.css";

export const About = () => {
  const navigate = useNavigate();

  const handleOrderClick = () => {
    navigate("/shop");
  };

  return (
    <div className="overflow-x-hidden">
      <FullscreenMedia
        assetType="video"
        src={PlaceholderVideo}
        overlayText="grand rose text overlay example"
      />
      <Section backgroundImage={gradiant}>
        <section className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 lg:gap-16 py-32">
          <div className="flex-1 text-cream px-6 lg:px-32 leading-relaxed text-2xl about-text">
            <span className="font-bold tracking-wider block mb-4 about-text">
              our story
            </span>
            Crafted for the discerning tastes of individuals committed to
            continual self-improvement,{" "}
            <span className="font-medium logo-light">grand rose</span> emerged
            from the shared vision of three friends. Frustrated by the
            inconsistent and often overwhelming intensity of many cannabinoid
            products in their quest for a healthy lifestyle, they were driven to
            find a solution.
            <br />
            <br />
            <span className="font-medium logo-light">grand rose</span> is a
            breakthrough protein powder, scientifically formulated with an
            ingredient and cannabinoid matrix prioritizing functional recovery
            and well-being, while ensuring a balanced experience for all.
          </div>
          <div className="flex-1 flex justify-center lg:justify-center">
            <Media />
          </div>
        </section>
        <section className="pt-32">
          <p className="text-cream px-6 lg:px-32 leading-relaxed text-2xl about-text">
            <span className="font-bold tracking-wider block mb-4 about-text">
              our science
            </span>
            Crafted for the discerning tastes of individuals committed to
            continual self-improvement,{" "}
            <span className="font-medium logo-light">grand rose</span> emerged
            from the shared vision of three friends. Frustrated by the
            inconsistent and often overwhelming intensity of many cannabinoid
            products in their quest for a healthy lifestyle, they were driven to
            find a solution.
            <br />
            <br />
            <span className="font-medium logo-light">grand rose</span> is a
            breakthrough protein powder, scientifically formulated with an
            ingredient and cannabinoid matrix prioritizing functional recovery
            and well-being, while ensuring a balanced experience for all.
          </p>
        </section>
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex flex-wrap lg:flex-nowrap items-center lg:items-start justify-between gap-8 lg:gap-16 px-6 lg:px-16 py-8">
            <Media />
            <Media />
            <Media />
          </div>
        </div>
      </Section>
      <section className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 lg:gap-16 px-6 lg:px-16 py-16">
        <div className="flex-1 text-center lg:text-left lg:pl-16">
          <div className="py-32">
            <Button className="font-bold text-xl" onClick={handleOrderClick}>
              ORDER NOW
            </Button>
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
    </div>
  );
};
