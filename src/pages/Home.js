import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Marquee } from "../components/theme";
import { VideoSection } from "../components/common";

export const Home = () => {
  const navigate = useNavigate();

  const handleNavigateDevHome = () => {
    navigate("/");
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-charcoal text-cream py-12">
      <header className="text-center mb-4">
        <p className="text-lg mb-6">Return to the dev home</p>
        <Button onClick={handleNavigateDevHome} variant="default">
          Dev
        </Button>
      </header>
      <VideoSection />
      <section className="py-12">
        <Marquee speed={60} />
      </section>
    </div>
  );
};
