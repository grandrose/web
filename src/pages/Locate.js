import React from "react";
import { Section } from "../components/theme";
import gradiant from "../assets/backgrounds/gr-core-gradient.png";

export const Locate = () => {
  return (
    <section className="min-h-full">
      <Section backgroundImage={gradiant}>
        <h1 className="text-cream font-bold text-xl">
          This page is coming soon!
        </h1>
      </Section>
    </section>
  );
};
