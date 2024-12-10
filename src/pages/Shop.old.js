import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import gradiant from "../assets/backgrounds/gr-core-gradient.png";
import IconGarnet from "../assets/icons/IconGarnet";
import VeganIcon from "../assets/icons/vegan-cream.svg";
import {
  Button,
  ContentDropdown,
  EmailSubmission,
  ProductGif,
  Section,
} from "../components/theme";
import { useCart } from "../context/CartContext";
import { fetchProductByHandle } from "../lib";

export const ShopOLD = () => {
  const { addToCart, toggleCart } = useCart();
  const [productData, setProductData] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getProduct = async () => {
      const product = await fetchProductByHandle("bloom");
      const description = product.description;
      const structuredData = {
        price: product.variants[0].price.amount.amount,
        title: product.title,
        image: { src: product.variants[0].image.src },
        variants: product.variants,
        id: product.variants[0].id,
        available: product.variants[0].available,
        description: description,
      };
      setProductData(structuredData);
      setSelectedVariant(product.variants[0]);
    };

    getProduct();
  }, []);

  if (!productData) {
    return <div>Product not found</div>;
  }

  const handleVariantSelection = (variant) => {
    setSelectedVariant(variant);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center bg-charcoal text-cream">
        <section className="flex flex-col md:flex-row gap-12 p-12 max-w-6xl w-full">
          <div className="w-full md:w-1/2 flex flex-col items-center border border-cream rounded-lg justify-center">
            <img
              src={productData.image?.src}
              alt={productData.title}
              className="w-full max-w-md h-auto mb-4"
            />
          </div>
          <div className="w-full md:w-1/2">
            <div className="flex items-center mb-6">
              <h2 className="text-6xl leading-none">{productData.title}</h2>
              <div className="ml-4 -translate-y-6 -translate-x-2">
                <IconGarnet className="w-8 h-8" />
              </div>
            </div>
            <p className="text-lg mb-8">
              The rose has arrived in season, touting 20g of plant-derived
              protein and 2.5mg infused thc into a one-of-a-kind beverage ready
              for your active routine.
            </p>
            <hr className="my-8 border-cream opacity-50" />
            <div className="flex gap-4 mb-8">
              {productData.variants.map((variant) => (
                <Button
                  key={variant.id}
                  variant="outline"
                  className="px-6 py-2 rounded-full border-2 border-cream transition-all duration-200"
                  onClick={() => handleVariantSelection(variant)}
                  disabled={!variant.available}
                  isSelected={selectedVariant?.id === variant.id}
                >
                  {variant.title}
                </Button>
              ))}
            </div>
            <hr className="my-8 border-cream opacity-50" />
            <p className="text-md mb-4">12 fl oz / 355 mL per can</p>
            <p className="text-md mb-8">
              Shipping to Minnesota, Colorado, Illinois, California
            </p>
            <Button
              variant="default"
              onClick={() => {
                addToCart(selectedVariant.id, 1);
                toggleCart();
              }}
              className="w-full py-4 mb-8 text-xl rounded-full bg-cream text-charcoal hover:bg-rose hover:text-cream font-medium"
            >
              ADD TO CART
            </Button>
            <Dietary />
          </div>
        </section>
        <section className="w-full p-10 max-w-6xl">
          <NutritionFacts />
        </section>
      </div>
      <Section backgroundImage={gradiant}>
        <div className="min-h-[95vh]"></div> {/*Temp screen space filler*/}
      </Section>
      <section className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 lg:gap-16 px-6 lg:px-32 py-8">
        <div className="flex-1 text-center lg:text-left pl-16">
          <div className="py-32">
            <h2 className="text-3xl text-cream mb-4">Not sold?</h2>
          </div>
          <p className="text-lg text-cream mb-6">
            Subscribe via email for a discount on delivery!
          </p>
          <EmailSubmission
            placeholder="your@email.com"
            background="light"
            onSubmit={(email) => null}
          />
          <div className="py-32">
            <Button
              className="font-medium text-xl"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              ORDER ONLINE
            </Button>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <ProductGif />
        </div>
      </section>
    </>
  );
};

const Dietary = () => {
  const dietaryItems = [
    { label: "Vegan", Icon: VeganIcon },
    { label: "Non-GMO", Icon: null },
    { label: "Gluten Free", Icon: null },
    { label: "Dairy Free", Icon: null },
    { label: "Sugar Free", Icon: null },
  ];
  return (
    <div className="flex gap-6 mb-8 justify-center">
      {dietaryItems.map(({ label, Icon }) => (
        <DietaryItem key={label} label={label} Icon={Icon} />
      ))}
    </div>
  );
};

const DietaryItem = ({ label, Icon }) => {
  return (
    <div className="text-center w-24">
      <p className="mb-2">{label}</p>
      <div className="w-12 h-12 border-2 border-cream rounded-full mx-auto flex items-center justify-center">
        {Icon ? (
          <img src={Icon} alt={`${label} icon`} className="w-8 h-8" />
        ) : null}
      </div>
    </div>
  );
};

const NutritionFacts = () => {
  return (
    <ContentDropdown
      title="Ingredients & Nutrition Facts"
      className="w-full mt-8"
    />
  );
};
