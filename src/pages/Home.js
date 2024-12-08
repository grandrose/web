import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import gradiant from "../assets/backgrounds/gr-core-gradient.png";
import defaultCans from "../assets/temp/cans-small.png";
import TemplateVideo from "../assets/temp/template-video.mp4";
import { VideoSection } from "../components/common";
import { Button, PPPMarquee, Section } from "../components/theme";
import { useCustomer } from "../context/CustomerContext";

export const Home = () => {
  const navigate = useNavigate();

  const { logout } = useCustomer();

  const handleNavigateDevHome = () => {
    navigate("/");
  };

  const devButtons = false;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-charcoal text-cream pt-12">
      {devButtons && (
        <header className="text-center mb-4">
          <p className="text-lg mb-6">Return to the dev home</p>
          <Button onClick={handleNavigateDevHome} variant="default">
            Dev
          </Button>

          <Button onClick={logout} variant="default">
            logout
          </Button>
        </header>
      )}

      <VideoSection src={TemplateVideo} />
      <section className="py-24">
        <PPPMarquee />
      </section>
      <Hero />
      <Section backgroundImage={gradiant}>
        <InfoSection />
        <IngredientIcons />
      </Section>
    </div>
  );
};

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  // TODO -- Replace with actual image paths
  const images = [defaultCans, defaultCans, defaultCans];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="bg-charcoal text-cream flex items-center justify-center pb-36">
      <div className="flex flex-col md:flex-row gap-24 max-w-7xl mx-auto w-full">
        <div className="flex-1 h-auto md:h-[700px] border border-cream rounded-lg overflow-hidden flex items-center justify-center">
          <img
            src={images[currentSlide]}
            alt={`Slide ${currentSlide + 1}`}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-between h-auto md:h-[700px] flex-1">
          <h1 className="text-[30px] md:text-[50px] leading-tight mb-6">
            Grand Rose is a functional-dose protein beverage infused with
            cannabinoids developed to nourish the health seeker by elevating
            active experiences and serving as an integrated catalyst for
            recovery.
          </h1>
          <div className="flex items-center justify-start">
            <Button
              onClick={() => navigate("/shop")}
              variant="default"
              className="text-xl font-medium"
            >
              ORDER NOW
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

const InfoSection = ({ src, type = "image" }) => {
  return (
    <section className="text-cream py-12 px-32">
      <div className="w-full">
        <div
          className="w-full h-[320px] flex items-center justify-center mb-8 overflow-hidden border border-cream bg-black rounded-lg"
          style={{ backgroundColor: "rgba(248, 241, 241, 0.08)" }}
        >
          {src ? (
            type === "video" ? (
              <video
                src={src}
                autoPlay
                loop
                muted
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={src}
                alt="Media Content"
                className="w-full h-full object-cover"
              />
            )
          ) : (
            <span className="text-cream text-lg ">Media coming soon</span>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 py-16">
          <p className="text-3xl leading-relaxed">
            At the heart of Grand Rose lies a meticulously crafted cannabinoid
            matrix, designed with a science-forward approach to deliver optimal
            and functional results in every dose.
          </p>
          <p className="text-3xl leading-relaxed">
            Each ingredient is carefully selected and balanced to ensure
            consistency, efficacy, and safety, setting a new industry standard
            of excellence for protein and cannabinoids.
          </p>
        </div>
      </div>
    </section>
  );
};

const IngredientIcons = () => {
  const ingredients = [
    { name: "Ingredient 1", icon: "https://via.placeholder.com/80" },
    { name: "Ingredient 2", icon: "https://via.placeholder.com/80" },
    { name: "Ingredient 3", icon: "https://via.placeholder.com/80" },
    { name: "Ingredient 4", icon: "https://via.placeholder.com/80" },
    { name: "Ingredient 5", icon: "https://via.placeholder.com/80" },
    { name: "Ingredient 6", icon: "https://via.placeholder.com/80" },
    { name: "Ingredient 7", icon: "https://via.placeholder.com/80" },
  ];

  const dietaryLabels = [
    { name: "Dairy-Free", icon: "https://via.placeholder.com/80" },
    { name: "Gluten-Free", icon: "https://via.placeholder.com/80" },
    { name: "Non-GMO", icon: "https://via.placeholder.com/80" },
  ];
  return (
    <section className="text-cream py-12 px-32 w-full">
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-7 gap-6 mb-12">
          {ingredients.map(({ name, icon }, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center space-y-6"
            >
              <span className="text-lg uppercase">{name}</span>
              <div className="w-[120px] h-[120px] rounded-full border border-cream flex items-center justify-center overflow-hidden">
                <img
                  src={icon}
                  alt={`${name} Icon`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-7 gap-6 mb-12">
          {dietaryLabels.map(({ name, icon }, index) => (
            <div
              key={index}
              className={`flex flex-col items-center justify-center space-y-6 ${
                index === 0 ? "md:col-start-3" : ""
              }`}
            >
              <span className="text-lg uppercase">{name}</span>
              <div className="w-[120px] h-[120px] rounded-full border border-cream flex items-center justify-center overflow-hidden">
                <img
                  src={icon}
                  alt={`${name} Icon`}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
