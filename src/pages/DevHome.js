import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/theme";

export const DevHome = () => {
  const navigate = useNavigate();

  const handleNavigatePlayground = () => {
    navigate("/playground");
  };
  const handleNavigateHome = () => {
    navigate("/");
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-charcoal text-cream">
      <header className="text-center">
        <h1 className="text-4xl mb-4">
          Welcome to <div className="font-bold inline">grand rose</div> dev
          landing
        </h1>
        <p className="text-lg mb-6">
          View the component playground -or- the home page
        </p>
        <div className="space-x-4">
          <Button onClick={handleNavigatePlayground} variant="default">
            Playground
          </Button>
          <Button onClick={handleNavigateHome} variant="default">
            Home
          </Button>
        </div>
      </header>
    </div>
  );
};
