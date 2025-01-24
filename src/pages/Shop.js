import { GRIconGarnet } from "@assets";
import template1240x320 from "@assets/temp/dummy_1240x320.png";
import { transformProductData } from "@common";
import { IngredientSection, IngredientsNutritionModal } from "@components";
import { useCart } from "@context/CartContext";
import { useTheme } from "@context/ThemeContext"; // <-- Import your theme hook
import {
  Button,
  EmailSubmission,
  Hero,
  Loader,
  MediaBar,
  ProductGif,
} from "@theme";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchProduct } from "../api";

export const Shop = () => {
  const { addToCart, toggleCart } = useCart();
  const { theme } = useTheme();
  const [searchParams] = useSearchParams();

  const [cachedProducts, setCachedProducts] = useState({});

  const [selectedProduct, setSelectedProduct] = useState("bloom");
  const [productData, setProductData] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showNutritionModal, setShowNutritionModal] = useState(false);

  useEffect(() => {
    const productQuery = searchParams.get("product");
    setSelectedProduct(productQuery || "bloom");

    const fetchInitialProducts = async () => {
      try {
        setLoading(true);
        const [bloomData, blossomData] = await Promise.all([
          fetchProduct("bloom"),
          fetchProduct("blossom"),
        ]);

        const bloomTransformed = transformProductData(bloomData);
        const blossomTransformed = transformProductData(blossomData);
        setCachedProducts({
          bloom: bloomTransformed,
          blossom: blossomTransformed,
        });
        setLoading(false);
      } catch (err) {
        console.error("Error pre-fetching products:", err);
        setLoading(false);
      }
    };

    fetchInitialProducts();
  }, [searchParams]);

  useEffect(() => {
    if (!selectedProduct) return;
    const cached = cachedProducts[selectedProduct];

    if (cached) {
      setProductData(cached);
      setSelectedVariant(cached.variants?.[0]);
      setLoading(false);
    } else {
      fetchSingleProduct(selectedProduct);
    }
  }, [selectedProduct, cachedProducts]);

  const fetchSingleProduct = async (slug) => {
    try {
      setLoading(true);
      const product = await fetchProduct(slug);
      const transformed = transformProductData(product);
      setCachedProducts((prev) => ({ ...prev, [slug]: transformed }));
      setProductData(transformed);
      setSelectedVariant(transformed.variants?.[0]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product:", error);
      setProductData(null);
      setLoading(false);
    }
  };

  const handleVariantSelection = (variant) => {
    setSelectedVariant(variant);
  };

  const handleAddToCart = async () => {
    if (!selectedVariant) return;
    await addToCart(selectedVariant.id, 1);
    toggleCart();
  };

  if (loading) return <Loader />;
  if (!productData) return <div>Product not found</div>;

  const {
    title,
    description,
    images,
    background, // if your product can override the theme background
    ingredients,
    nutritionFacts,
    shippingLocations,
  } = productData;

  const containerClasses = background || theme.bodyClasses;

  return (
    <>
      <div
        className={`
          px-[16.15vw]
          flex flex-col items-center justify-center
          transition-all duration-200
          ${containerClasses}
        `}
      >
        <section className="flex flex-col md:flex-row gap-14 py-12 w-full">
          <div
            className={`w-full md:w-1/2 flex flex-col items-center border ${theme.borderColor} rounded-lg justify-center p-4`}
          >
            <img
              src={images?.[0]}
              alt={title}
              className="w-full max-w-[675px] h-auto object-contain mb-4 transition-all duration-200"
            />
          </div>

          <div className="w-full md:w-1/2">
            <div className="flex items-center mb-6">
              <h2 className="text-[80px] leading-none">{title}</h2>
              <div className="ml-4 -translate-y-6 -translate-x-2">
                <img
                  src={GRIconGarnet}
                  alt="Grand Rose Icon"
                  className="w-[25px] h-[25px]"
                />
              </div>
            </div>

            <p className="text-[20px] mb-8">{description}</p>
            <hr className="mt-8 border-[rgba(248,241,241,0.1)]" />

            <div className="flex gap-12 my-4 mb-12">
              {productData.variants?.map((variant) => (
                <Button
                  key={variant.id}
                  variant="outline"
                  className="px-8 py-1 transition-all duration-200 font-medium lg:text-[20px]"
                  onClick={() => handleVariantSelection(variant)}
                  disabled={!variant.availableForSale}
                  isSelected={selectedVariant?.id === variant.id}
                >
                  {variant.title}
                </Button>
              ))}
            </div>

            <p className="text-[20px] mb-4">12 fl oz / 355 mL per can</p>
            <p className="text-[20px] mb-8">{shippingLocations}</p>

            <button
              className="text-[20px] font-bold pb-24"
              onClick={() => setShowNutritionModal(true)}
            >
              See Ingredients &amp; Nutrition Facts
            </button>

            <Button
              variant="outline"
              onClick={handleAddToCart}
              className="w-full py-2 mb-8 text-[20px] font-medium"
            >
              ADD TO CART
            </Button>
          </div>
        </section>
      </div>

      <MediaBar src={template1240x320} />
      <IngredientSection rose={true} />
      <Hero />
      <Hero
        reversed
        variant="light"
        showOrderButton
        text="Sip on Blossom formulated without cannabinoids with the same great benefits."
        textSize="text-xl md:text-4xl lg:text-[50px]"
      />
      <section
        className={`${theme.bodyClasses} flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 lg:gap-16 px-4 sm:px-6 lg:px-32 py-8`}
      >
        <div className="flex-1 text-center lg:text-left lg:pl-16">
          <div className="py-16 lg:py-32">
            <h2 className="text-3xl mb-4">Not sold?</h2>
          </div>
          <p className="text-lg mb-6">
            Subscribe via email for a discount on delivery!
          </p>
          <EmailSubmission
            placeholder="Your email address"
            buttonLabel="Sign Up"
            background="light"
            buttonTheme="dark"
          />
          <div className="py-16 lg:py-32">
            <Button
              className="font-medium text-xl px-4"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              variant="outline"
            >
              ORDER ONLINE
            </Button>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <ProductGif />
        </div>
      </section>

      {showNutritionModal && (
        <IngredientsNutritionModal
          productName={title}
          ingredients={ingredients}
          nutritionFacts={nutritionFacts}
          onClose={() => setShowNutritionModal(false)}
        />
      )}
    </>
  );
};
