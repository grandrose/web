import React, { useState, useEffect } from "react";
import { fetchStorePolicies } from "../api";

export const Policies = () => {
  const [section, setSection] = useState("terms-of-service");
  const [policies, setPolicies] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const policyMap = {
    "privacy-policy": "privacyPolicy",
    "refund-policy": "refundPolicy",
    "terms-of-service": "termsOfService",
    "shipping-policy": "shippingPolicy",
    "accessibility-statement": "accessibilityStatement",
  };

  useEffect(() => {
    const loadPolicies = async () => {
      try {
        const data = await fetchStorePolicies();
        setPolicies(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadPolicies();
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [section]);

  const renderShopifyPolicy = (policyKey) => {
    const shopifyPolicy = policies[policyKey];

    if (!shopifyPolicy) {
      return (
        <div>
          <h1 className="text-2xl font-bold mb-4">Policy Not Found</h1>
          <hr className="my-8 border-cream opacity-50" />
          <p>The requested policy could not be found.</p>
        </div>
      );
    }

    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">{shopifyPolicy.title}</h1>
        <hr className="my-8 border-cream opacity-50" />
        <div
          dangerouslySetInnerHTML={{
            __html: shopifyPolicy.body || "",
          }}
        />
      </div>
    );
  };

  const renderPolicyContent = () => {
    if (loading) {
      return <p>Loading...</p>;
    }
    if (error) {
      return <p className="text-red-400">Error: {error}</p>;
    }
    const policyKey = policyMap[section] || null;
    if (!policyKey) {
      return (
        <div>
          <h1 className="text-2xl font-bold mb-4">Policy Not Found</h1>
          <hr className="my-8 border-cream opacity-50" />
          <p>The requested policy could not be found.</p>
        </div>
      );
    }

    return renderShopifyPolicy(policyKey);
  };

  return (
    <div
      className="
        flex flex-col md:flex-row min-h-screen
        bg-charcoal text-cream
        px-6 md:px-[16.15vw] py-6 md:py-12 gap-8
      "
    >
      <aside className="w-full md:w-1/3">
        <ul className="space-y-6 md:space-y-16 text-base md:text-[25px] cursor-pointer">
          <li
            className={`${
              section === "terms-of-service" ? "font-bold" : "text-cream"
            }`}
            onClick={() => setSection("terms-of-service")}
          >
            Terms of Service
          </li>
          <li
            className={`${
              section === "privacy-policy" ? "font-bold" : "text-cream"
            }`}
            onClick={() => setSection("privacy-policy")}
          >
            Privacy Policy
          </li>
          <li
            className={`${
              section === "refund-policy" ? "font-bold" : "text-cream"
            }`}
            onClick={() => setSection("refund-policy")}
          >
            Refund Policy
          </li>
          <li
            className={`${
              section === "accessibility-statement" ? "font-bold" : "text-cream"
            }`}
            onClick={() => setSection("accessibility-statement")}
          >
            Accessibility Statement
          </li>
          <li
            className={`${
              section === "shipping-policy" ? "font-bold" : "text-cream"
            }`}
            onClick={() => setSection("shipping-policy")}
          >
            Shipping Policy
          </li>
        </ul>
      </aside>
      <main className="flex-1 text-base md:text-[20px]">
        {renderPolicyContent()}
      </main>
    </div>
  );
};
