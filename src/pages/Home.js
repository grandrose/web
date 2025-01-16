import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  default as gradiant,
  default as primaryGradiant,
} from "../assets/backgrounds/gr-core-gradient.png";
import defaultCans from "../assets/temp/cans-small.png";
import TemplateVideo from "../assets/temp/template-video.mp4";
import template1240x320 from "../assets/temp/dummy_1240x320.png";
import { FullscreenMedia, PPPMarquee, Section, MediaBar, Hero } from "@theme";
import "./styles/Highlight.css";
import { NutritionSection, IngredientSection } from "@components";

export const Home = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center text-cream">
        <FullscreenMedia
          assetType="video"
          src={TemplateVideo}
          overlayText={{
            lineOne: "Plant powered protein",
            lineTwo: "& functional-dose cannabis",
          }}
        />
        <section className="py-[32px]">
          <PPPMarquee />
        </section>
        <Hero
          showOrderButton
          customMessage="A functional-dose cannabis beverage developed to elevate active experiences and amplify recovery."
          boldWords={["functionaldose", "amplify"]}
        />
        <MediaBar src={template1240x320} />
        <IngredientSection />
        <Hero
          showOrderButton
          reversed
          customMessage="Experience the sensation, curated to ignite human performance."
        />
        {/* <Hero2 /> */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 gap-x-8 text-left text-4xl py-32 px-8">
          <div className="lg:max-w-[570px]">
            <p>
              Amplify recovery with plant protein and essential amino acids.
            </p>
          </div>
          <div className="lg:max-w-[570px]">
            <p>Enhance strength and performance with the power of creatine.</p>
          </div>
          <div className="lg:max-w-[570px]">
            <p>
              Naturally combat inflammation and support recovery with turmeric.
            </p>
          </div>
          <div className="lg:max-w-[570px]">
            <p>Boost energy and mental focus with vitamin B12.</p>
          </div>
          <div className="lg:max-w-[570px]">
            <p>Strengthen immunity with antioxidant-rich vitamin C.</p>
          </div>
          <div className="lg:max-w-[570px]">
            <p>Support bone health and overall wellness with vitamin D3.</p>
          </div>
        </div>
      </div>
      <Section backgroundImage={gradiant}>
        <NutritionSection />
        <div className="text-cream pt-24 pb-32 px-6 sm:px-12 lg:px-32 w-full text-center">
          <div className="text-cream text-4xl pb-32">
            <p>
              At the heart of grand rose lies a meticulously crafted cannabinoid
              matrix, designed with a science-forward approach to deliver
              optimal and functional results in every single dose.
            </p>
          </div>
          <div className="text-cream text-4xl">
            <p>
              Each ingredient is carefully selected and balanced to ensure
              consistency, efficacy, and safety, setting a new industry standard
              of excellence for protein and cannabinoids.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
};

// const Hero = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const navigate = useNavigate();
//   const images = [defaultCans, defaultCans, defaultCans];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % images.length);
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [images.length]);

//   return (
//     <section className="text-cream flex items-center justify-center flex-wrap min-h-[800px]">
//       <div className="flex items-center justify-center w-full md:w-[55%] h-auto md:h-[800px] p-4 md:p-8 bg-charcoal">
//         <div className="rounded-lg overflow-hidden w-[90%] md:w-[700px] md:h-[700px]">
//           <img
//             src={images[currentSlide]}
//             alt={`Slide ${currentSlide + 1}`}
//             className="object-contain w-full h-full"
//           />
//         </div>
//       </div>
//       <div
//         className="flex flex-col justify-between w-full md:w-[45%] h-auto md:h-[800px] p-6 md:p-12 bg-cover bg-no-repeat bg-center"
//         style={{ backgroundImage: `url(${primaryGradiant})` }}
//       >
//         <div className="flex flex-col justify-center flex-grow p-12">
//           <h1 className="text-xl md:text-4xl lg:text-[40px] font-light leading-tight text-center md:text-left">
//             A <span className="font-medium">functional-dose</span> cannabis
//             beverage developed to <span className="font-medium">elevate</span>{" "}
//             active experiences and <span className="font-medium">amplify</span>{" "}
//             recovery.
//           </h1>
//         </div>
//         <div className="mt-6 md:mt-0 p-12">
//           <button
//             onClick={() => navigate("/shop")}
//             className="py-2 px-6 border-2 border-cream rounded-full text-lg md:text-xl font-medium hover:bg-cream hover:text-charcoal transition"
//           >
//             ORDER NOW
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// const Hero2 = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const navigate = useNavigate();
//   const images = [defaultCans, defaultCans, defaultCans];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % images.length);
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [images.length]);

//   return (
//     <section className="text-cream flex items-center justify-center flex-wrap min-h-[800px]">
//       <div
//         className="flex flex-col justify-between w-full md:w-[45%] h-auto md:h-[800px] p-6 md:p-12 bg-cover bg-no-repeat bg-center"
//         style={{ backgroundImage: `url(${primaryGradiant})` }}
//       >
//         <div className="flex flex-col justify-center flex-grow p-12">
//           <h1 className="text-xl md:text-4xl lg:text-[50px] font-light leading-tight text-center md:text-left">
//             Experience the sensation, curated to ignite human performance.
//           </h1>
//         </div>
//         <div className="mt-6 md:mt-0 p-12">
//           <button
//             onClick={() => navigate("/shop")}
//             className="py-2 px-6 border-2 border-cream rounded-full text-lg md:text-xl font-medium hover:bg-cream hover:text-charcoal transition"
//           >
//             ORDER NOW
//           </button>
//         </div>
//       </div>
//       <div className="flex items-center justify-center w-full md:w-[55%] h-auto md:h-[800px] p-4 md:p-8 bg-charcoal">
//         <div className="rounded-lg overflow-hidden w-[90%] md:w-[700px] md:h-[700px]">
//           <img
//             src={images[currentSlide]}
//             alt={`Slide ${currentSlide + 1}`}
//             className="object-contain w-full h-full"
//           />
//         </div>
//       </div>
//     </section>
//   );
// };
