import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Cart } from "../components/common";
import {
  Button,
  ContentDropdown,
  CoreButton,
  EmailSubmission,
  PPPMarquee,
  OptionDropdown,
  QuantitySelector,
} from "../components/theme";
import { useCart } from "../context/CartContext";

export const Playground = () => {
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { addToCart, removeFromCart, clearCart } = useCart();
  const [mockItemId, setMockItemId] = useState(1);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleNavigateHome = () => {
    navigate("/");
  };

  const mockProduct = {
    id: mockItemId,
    variantId: `gid://shopify/ProductVariant/1234567890`,
    title: "bloom",
    variant: {
      id: `gid://shopify/ProductVariant/1234567890`,
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
          <Button onClick={() => null}>Default Button</Button>
          <Button variant="outline" onClick={() => null}>
            Outline Button
          </Button>
          <Button variant="outline" disabled={true} onClick={() => null}>
            Disabled
          </Button>
          <CoreButton label="Core Button" onClick={() => null} />
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
            onSubmit={(email) => null}
          />
          <EmailSubmission
            placeholder="email w/ no button"
            showButton={false}
            background="light"
            onSubmit={(email) => null}
          />
        </div>
      </section>
      <hr className="my-8 border-cream opacity-50" />

      {/* Cart Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Cart Management</h2>
        <div className="flex space-x-4">
          <Button variant="default" onClick={toggleCart}>
            open cart
          </Button>
          <Button variant="default" onClick={clearCart}>
            clear cart
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
          onSelect={(option) => null}
        />
      </section>

      {/* ContentDropdown */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">ContentDropdown</h2>
        <ContentDropdown />
      </section>
      <hr className="my-8 border-cream opacity-50" />

      {/* Quantity Selector */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Quantity Selector</h2>
        <QuantitySelector
          initial={1}
          onChange={(quantity) => null}
          variant="light"
        />
      </section>
      <hr className="my-8 border-cream opacity-50" />

      {/* Marquee */}
      <h2 className="text-2xl font-semibold mb-4">Quantity Selector</h2>
      <PPPMarquee />
    </div>
  );
};
