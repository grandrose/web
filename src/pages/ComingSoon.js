import React from "react";
import gradiant from "../assets/backgrounds/gr-core-gradient.png";
import { Section } from "../components/theme";

export const ComingSoon = () => {
  return (
    <Section backgroundImage={gradiant}>
      <div className="h-[90vh] flex items-center justify-center">
        <h1 className="text-cream font-bold text-xl">
          This page is coming soon!
        </h1>
      </div>
    </Section>
  );
};
