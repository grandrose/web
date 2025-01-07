import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchProduct } from "../api";
import BlossomGradient from "../assets/backgrounds/blossom-secondary-gradient-gr.png";
import GRIconGarnet from "../assets/icons/GR-logo-garnet.png";
import defaultCans from "../assets/temp/cans-small.png";
import template1240x320 from "../assets/temp/dummy_1240x320.png";
import { IngredientSection } from "../components/common";
import {
  Button,
  EmailSubmission,
  Loader,
  MediaBar,
  ProductGif,
} from "../components/theme";
import { useCart } from "../context/CartContext";
import { transformProductData } from "../common";

export const Shop = () => {
  const defaultTheme = "bg-charcoal text-cream";
  const { addToCart, toggleCart } = useCart();
  const [searchParams] = useSearchParams();

  // Keeps a cache of fetched products:
  const [cachedProducts, setCachedProducts] = useState({});

  // State for the product currently displayed:
  const [selectedProduct, setSelectedProduct] = useState("bloom");
  const [productData, setProductData] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [loading, setLoading] = useState(true);

  /**
   * On first render, decide which product user wants (bloom or blossom) from the URL,
   * and then pre-fetch both bloom + blossom to keep them in local cache.
   */
  useEffect(() => {
    const productQuery = searchParams.get("product");
    setSelectedProduct(productQuery || "bloom");

    const fetchInitialProducts = async () => {
      try {
        setLoading(true);
        // fetch both simultaneously
        const [bloomData, blossomData] = await Promise.all([
          fetchProduct("bloom"),
          fetchProduct("blossom"),
        ]);
        // transform and store them in cache
        setCachedProducts({
          bloom: transformProductData(bloomData),
          blossom: transformProductData(blossomData),
        });
        setLoading(false);
      } catch (err) {
        console.error("Error pre-fetching products:", err);
        setLoading(false);
      }
    };

    fetchInitialProducts();
  }, [searchParams]);

  /**
   * Whenever selectedProduct changes, look for it in the cache first.
   * If it's there, use it; if not, fetch it (fallback).
   */
  useEffect(() => {
    if (!selectedProduct) return;
    const cached = cachedProducts[selectedProduct];

    if (cached) {
      setProductData(cached);
      setSelectedVariant(cached.variants?.[0]);
      setLoading(false);
    } else {
      // fallback: fetch the single product if not in cache
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

  return (
    <>
      <div
        className={`px-[16.15vw] flex flex-col items-center justify-center transition-all duration-200 ${
          productData.background || defaultTheme
        }`}
      >
        <section className="flex flex-col md:flex-row gap-14 py-12 w-full">
          {/* LEFT COLUMN: Product Image */}
          <div className="w-full md:w-1/2 flex flex-col items-center border border-cream rounded-lg justify-center p-4">
            <img
              src={productData.images?.[0]}
              alt={productData.title}
              className="w-full max-w-[675px] h-auto object-contain mb-4 transition-all duration-200"
            />
          </div>

          {/* RIGHT COLUMN: Product Content */}
          <div className="w-full md:w-1/2">
            <div className="flex items-center mb-6">
              <h2 className="text-[80px] leading-none">{productData.title}</h2>
              <div className="ml-4 -translate-y-6 -translate-x-2">
                <img
                  src={GRIconGarnet}
                  alt="Grand Rose Icon"
                  className="w-[25px] h-[25px]"
                />
              </div>
            </div>

            <p className="text-[20px] mb-8">{productData.description}</p>
            <hr className="mt-8 border-[rgba(248,241,241,0.1)]" />

            <div className="flex gap-12 my-4 mb-12">
              {productData.variants?.map((variant) => (
                <Button
                  key={variant.id}
                  variant="outline"
                  className="px-8 py-1 rounded-full border-2 border-cream transition-all duration-200 font-medium lg:text-[20px]"
                  onClick={() => handleVariantSelection(variant)}
                  disabled={!variant.availableForSale}
                  isSelected={selectedVariant?.id === variant.id}
                >
                  {variant.title}
                </Button>
              ))}
            </div>

            <p className="text-[20px] mb-4">12 fl oz / 355 mL per can</p>
            <p className="text-[20px] mb-8">{productData.shippingLocations}</p>

            <button className="text-[20px] font-bold pb-24">
              See Ingredients & Nutrition Facts
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

      {/* Additional sections below */}
      <MediaBar src={template1240x320} />
      <IngredientSection rose={true} />
      <BlossomHero />
      <section className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 lg:gap-16 px-4 sm:px-6 lg:px-32 py-8">
        <div className="flex-1 text-center lg:text-left lg:pl-16">
          <div className="py-16 lg:py-32">
            <h2 className="text-3xl text-cream mb-4">Not sold?</h2>
          </div>
          <p className="text-lg text-cream mb-6">
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

/**
 * BlossomHero Component
 *
 * (optional) If you want instant navigation to Blossom,
 * you can rely on the pre-fetched data in Shop.
 * As soon as the user navigates to "?product=blossom",
 * the Shop component will instantly render from cache.
 */
const BlossomHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const images = [defaultCans, defaultCans, defaultCans];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="text-charcoal flex items-center justify-center flex-wrap min-h-[800px]">
      <div
        className="flex flex-col justify-between w-full md:w-[45%] h-auto md:h-[800px] p-6 md:p-12 bg-cover bg-no-repeat bg-center"
        style={{ backgroundImage: `url(${BlossomGradient})` }}
      >
        <div className="flex flex-col justify-center flex-grow p-12">
          <h1
            className="text-xl md:text-4xl lg:text-[50px] text-center md:text-left"
            style={{ lineHeight: "1.1" }}
          >
            Sip on Blossom formulated without cannabinoids with the same great
            benefits.
          </h1>
        </div>
        <div className="mt-6 md:mt-0 p-12">
          <button
            onClick={() => navigate("/shop?product=blossom")}
            className="py-2 px-6 border-2 border-charcoal rounded-full text-lg md:text-xl font-medium hover:bg-cream hover:text-charcoal transition"
          >
            ORDER NOW
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center w-full md:w-[55%] h-auto md:h-[800px] p-4 md:p-8 bg-charcoal">
        <div className="rounded-lg overflow-hidden w-[90%] md:w-[700px] md:h-[700px]">
          <img
            src={images[currentSlide]}
            alt={`Slide ${currentSlide + 1}`}
            className="object-contain w-full h-full"
          />
        </div>
      </div>
    </section>
  );
};
