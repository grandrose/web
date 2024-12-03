import React from "react";
import {
  Button,
  CoreButton,
  ContentDropdown,
  OptionDropdown,
  EmailSubmission,
  ItemCard,
  QuantitySelector,
} from "../components/theme";
import { useNavigate } from "react-router-dom";

export const Playground = () => {
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate("/");
  };

  return (
    <div className="p-8 bg-charcoal min-h-screen text-cream">
      <div className="flex items-center gap-x-4 mb-6">
        <h1 className="text-3xl font-bold">Playground</h1>
        <Button onClick={handleNavigateHome} variant="default">
          Home
        </Button>
      </div>

      {/* Buttons */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Buttons</h2>
        <div className="flex space-x-4">
          <Button onClick={() => console.log("Default Button clicked")}>
            Default Button
          </Button>
          <Button
            variant="outline"
            onClick={() => console.log("Outline Button clicked")}
          >
            Outline Button
          </Button>
          <CoreButton
            label="Core Button"
            onClick={() => console.log("Core Button clicked")}
          />
        </div>
      </section>

      {/* Email Input */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Email Input</h2>
        <EmailSubmission
          placeholder="Enter your email"
          buttonLabel="Submit"
          onSubmit={(email) => console.log("Submitted email:", email)}
        />
      </section>

      {/* OptionDropdown */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">OptionDropdown</h2>
        <OptionDropdown
          label="THE 30-DAY HERO PLAN"
          options={["Option 1", "Option 2", "Option 3"]}
          onSelect={(option) => console.log("Selected:", option)}
        />
      </section>

      {/* ContentDropdown */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">ContentDropdown</h2>
        <ContentDropdown
        //   label="Ingredients & Nutrition Facts"
        //   content={
        //     <p>
        //       Ingredients: Carbonated Water, Pea Protein, Natural Flavors,
        //       Citric Acid, Vitamin D (Cholecalciferol), Vitamin B12
        //       (Cyanocobalamin), Lemon Juice, Tangerine Extract.
        //     </p>
        //   }
        //   rightContent={
        //     <div className="bg-cream p-4 rounded-lg">
        //       INSERT NUTRITION FACTS
        //     </div>
        //   }
        />
      </section>

      {/* Item Card */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Item Card</h2>
        <ItemCard
          title="bloom"
          subtitle="2.5mg THC"
          price="109.99"
          quantity="32"
          imageUrl={null}
        />
      </section>

      {/* Quantity Selector */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Quantity Selector</h2>
        <QuantitySelector
          initial={1}
          onChange={(quantity) => console.log("Quantity changed:", quantity)}
        />
      </section>
    </div>
  );
};
