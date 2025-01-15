import React, { useState, useEffect } from "react";

export const Policies = () => {
  const [section, setSection] = useState("terms-of-service");

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [section]);

  const renderPolicyContent = () => {
    switch (section) {
      case "privacy-policy":
        return (
          <div>
            <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
            <hr className="my-8 border-cream opacity-50" />
            <p>Your privacy is important to us...</p>
          </div>
        );
      case "terms-of-service":
        return (
          <div>
            <h1 className="text-2xl font-bold mb-4">Terms of Service</h1>
            <hr className="my-8 border-cream opacity-50" />
            <p>Welcome to our terms of service...</p>
          </div>
        );
      case "refund-policy":
        return (
          <div>
            <h1 className="text-2xl font-bold mb-4">Refund Policy</h1>
            <hr className="my-8 border-cream opacity-50" />
            <p>Our refund policy is...</p>
          </div>
        );
      case "accessibility-statement":
        return (
          <div>
            <h1 className="text-2xl font-bold mb-4">Accessibility Statement</h1>
            <hr className="my-8 border-cream opacity-50" />
            <p>Our accessibility statement is...</p>
          </div>
        );
      case "shipping-policy":
        return (
          <div>
            <h1 className="text-2xl font-bold mb-4">Shipping Policy</h1>
            <hr className="my-8 border-cream opacity-50" />
            <p>Our shipping policy is...</p>
          </div>
        );
      default:
        return (
          <div>
            <h1 className="text-2xl font-bold mb-4">Policy Not Found</h1>
            <hr className="my-8 border-cream opacity-50" />
            <p>The requested policy could not be found.</p>
          </div>
        );
    }
  };

  return (
    <div
      className="flex flex-col md:flex-row min-h-screen bg-charcoal text-cream
                 px-6 md:px-[16.15vw] py-6 md:py-12 gap-8"
    >
      <aside className="w-full md:w-1/3">
        <ul className="space-y-6 md:space-y-16 text-base md:text-[25px] hover:cursor-pointer">
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
