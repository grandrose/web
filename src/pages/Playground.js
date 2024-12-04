import React, { useState } from "react";
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
import { Cart } from "../components/common";
import { useCart } from "../context/CartContext";

export const Playground = () => {
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { addToCart, removeFromCart, cart } = useCart(); // Access cart context functions and state
  const [mockItemId, setMockItemId] = useState(1); // For unique mock item IDs

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleNavigateHome = () => {
    navigate("/");
  };

  const mockProduct = {
    id: mockItemId,
    variantId: `gid://shopify/ProductVariant/1234567890`, // Use a realistic global ID format
    title: "bloom",
    variant: {
      id: `gid://shopify/ProductVariant/1234567890`, // Update variant ID to use the same realistic format
      title: "2.5mg THC",
      price: 34.99,
      image: {
        src: "https://via.placeholder.com/150",
      },
    },
    quantity: 1,
  };

  const addItemToCart = () => {
    addToCart(mockProduct.variant.id, mockProduct.quantity);
    setMockItemId((prev) => prev + 1);
    console.log(cart);
  };

  const removeMockItemFromCart = () => {
    removeFromCart(mockProduct.variantId);
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
          <Button
            variant="outline"
            disabled={true}
            onClick={() => console.log("Outline Button clicked")}
          >
            Disabled
          </Button>
          <CoreButton
            label="Core Button"
            onClick={() => console.log("Core Button clicked")}
          />
        </div>
      </section>
      <hr className="my-8 border-cream opacity-50" />

      {/* Email Input */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Email Input</h2>
        <div className="flex space-x-8">
          <EmailSubmission
            placeholder="email with button"
            buttonLabel="Submit"
            onSubmit={(email) => console.log("Submitted email:", email)}
          />
          <EmailSubmission
            placeholder="email w/ no button"
            showButton={false}
            background="light"
            onSubmit={(email) => console.log("Submitted email:", email)}
          />
        </div>
      </section>
      <hr className="my-8 border-cream opacity-50" />

      {/* Cart Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Cart Management</h2>
        <div className="flex space-x-4">
          <Button variant="default" onClick={toggleCart} className="mr-[50px]">
            open cart
          </Button>
          <Button variant="default" onClick={addItemToCart}>
            Add Mock Item to Cart
          </Button>
          <Button variant="outline" onClick={removeMockItemFromCart}>
            Remove Mock Item from Cart
          </Button>
        </div>
        <hr className="my-8 border-cream opacity-50" />
        <Cart isModalOpen={isCartOpen} toggleModal={toggleCart} />
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
        <ContentDropdown />
      </section>
      <hr className="my-8 border-cream opacity-50" />

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
      <hr className="my-8 border-cream opacity-50" />

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
