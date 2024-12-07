import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gradiant from "../assets/backgrounds/gr-core-gradient.png";
import defaultCans from "../assets/temp/cans-small.png";
import { VideoSection } from "../components/common";
import { Button, PPPMarquee, Section } from "../components/theme";
import { useCustomer } from "../context/CustomerContext";
import TemplateVideo from "../assets/temp/template-video.mp4";

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
      <Section backgroundImage={gradiant} />
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
