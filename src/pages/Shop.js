import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { Button, ContentDropdown } from "../components/theme";
import { useNavigate } from "react-router-dom";
import IconGarnet from "../assets/icons/IconGarnet";
import { fetchProductByHandle } from "../lib";

export const Shop = () => {
  const { addToCart, toggleCart, isCartOpen } = useCart();
  const [productData, setProductData] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    console.log("VARIANT", selectedVariant);
  }, [selectedVariant]);

  useEffect(() => {
    const getProduct = async () => {
      const product = await fetchProductByHandle("bloom");
      const description = product.description;
      const structuredData = {
        price: product.variants[0].price.amount,
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
    setSelectedVariant(variant.title);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-charcoal text-cream">
      <section className="flex gap-12 p-12 max-w-6xl w-full">
        <div className="min-h-[720px] w-1/2 flex flex-col items-center">
          <img
            src={productData.image?.src}
            alt={productData.title}
            className="w-full max-w-md h-auto border border-cream rounded-lg mb-4 min-h-[300px]"
          />
          <div className="mt-[25px]">
            <ContentDropdown
              title="Ingredients & Nutrition Facts"
              className="w-full mt-8"
            >
              <div>
                <p>
                  Ingredients: Carbonated Water, Pea Protein, Natural Flavors,
                  Citric Acid, Vitamin D (Cholecalciferol), Vitamin B12
                  (Cyanocobalamin), Lemon Juice, Tangerine Extract.
                </p>
                <p>
                  Contains: 2.5MG THC, 5MG CBD, and 5MG minor cannabinoids from
                  full spectrum hemp extract.
                </p>
                <p>
                  Warning: This product is not recommended for children, people
                  pregnant or breastfeeding, or caffeine-sensitive individuals.
                </p>
              </div>
            </ContentDropdown>
          </div>
        </div>
        <div className="w-1/2">
          <div className="flex items-center mb-6">
            <h2 className="text-6xl font-extrabold leading-none">
              {productData.title}
            </h2>
            <div className="ml-4">
              <IconGarnet className="w-8 h-8" />
            </div>
          </div>
          <p className="text-lg mb-8">
            The rose has arrived in season, touting 20g of plant-derived protein
            and 2.5mg infused thc into a one-of-a-kind beverage ready for your
            active routine.
          </p>
          <div className="flex gap-4 mb-8">
            {productData.variants.map((variant) => {
              console.log(
                "isSelected",
                variant.title,
                selectedVariant === variant.title
              );
              return (
                <Button
                  key={variant.id}
                  variant="outline"
                  className="px-6 py-2 rounded-full border-2 border-cream transition-all duration-200"
                  onClick={() => handleVariantSelection(variant)}
                  disabled={!variant.available}
                  isSelected={selectedVariant === variant.title}
                >
                  {variant.title}
                </Button>
              );
            })}
          </div>
          <p className="text-md mb-4">12 fl oz / 355 mL per can</p>
          <p className="text-md mb-8">
            Shipping to Minnesota, Colorado, Illinois, California
          </p>
          <Button
            variant="default"
            onClick={() => {
              addToCart(selectedVariant.id, 1);
              if (!isCartOpen) toggleCart();
            }}
            className="w-full py-4 mb-8 text-xl rounded-full bg-cream text-charcoal hover:bg-rose hover:text-cream"
          >
            ADD TO CART
          </Button>
          <div className="flex gap-6 mb-8">
            <div className="text-center">
              <p className="mb-2">Vegan</p>
              <div className="w-6 h-6 border-2 border-cream rounded-full mx-auto"></div>
            </div>
            <div className="text-center">
              <p className="mb-2">Non-GMO</p>
              <div className="w-6 h-6 border-2 border-cream rounded-full mx-auto"></div>
            </div>
            <div className="text-center">
              <p className="mb-2">Gluten Free</p>
              <div className="w-6 h-6 border-2 border-cream rounded-full mx-auto"></div>
            </div>
            <div className="text-center">
              <p className="mb-2">Dairy Free</p>
              <div className="w-6 h-6 border-2 border-cream rounded-full mx-auto"></div>
            </div>
            <div className="text-center">
              <p className="mb-2">Sugar Free</p>
              <div className="w-6 h-6 border-2 border-cream rounded-full mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
