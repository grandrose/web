import React from "react";
import { Section } from "../components/theme";
import gradiant from "../assets/backgrounds/gr-core-gradient.png";

export const Locate = () => {
  return (
    <Section backgroundImage={gradiant}>
      <div className="h-[49.5vh] flex items-center justify-center">
        <h1 className="text-cream font-bold text-xl">
          This page is coming soon!
        </h1>
      </div>
    </Section>
  );
};
