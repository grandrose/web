import React from "react";
import gradiant from "../assets/backgrounds/gr-core-gradient.png";
import { Button, Section } from "../components/theme";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();
  const quotes = [
    "Every rose has its path, but this one seems to be a thorny detour. Let’s get you back on track!",
    "This page has withered away—let’s guide you back to something blooming.",
    "Even the grandest roses can’t bloom on a page that doesn’t exist.",
    "Lost among the petals? Let us help you find your way.",
    "Not every rose leads to a garden. Let’s redirect you to something sweeter.",
    "This isn’t the bouquet you were looking for. Let’s get you back on track.",
    "Every rose has its thorn, and this page might be yours. Let’s fix that.",
    "The trail ends here, but the garden awaits—let’s return to Grand Rose.",
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  const handleNavigation = () => {
    navigate("/");
  };

  return (
    <Section backgroundImage={gradiant} className="min-h-[90vh]">
      <div className="h-[49.5vh] flex flex-col items-center justify-center text-center">
        <h1 className="text-cream font-bold text-xl mb-4">404!</h1>
        <p className="text-cream font-light text-lg pb-4">{randomQuote}</p>

        <Button onClick={handleNavigation}>home</Button>
      </div>
    </Section>
  );
};
