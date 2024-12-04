import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/theme";
import { VideoSection } from "../components/common";

export const Home = () => {
  const navigate = useNavigate();

  const handleNavigateDevHome = () => {
    navigate("/");
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-charcoal text-cream">
      <header className="text-center mb-4">
        <p className="text-lg mb-6">Return to the dev home</p>
        <Button onClick={handleNavigateDevHome} variant="default">
          Dev
        </Button>
      </header>
      <VideoSection />
    </div>
  );
};
