import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const Policies = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const section = location.state?.section || "terms-of-service";

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
    <div className="flex h-screen">
      <div className="w-1/4 bg-rose text-cream p-6">
        <h2 className="text-3xl font-semibold mb-4 flex justify-center underline">
          Policies & Statements
        </h2>
        <ul className="space-y-4">
          <li
            className={`cursor-pointer ${
              section === "terms-of-service" ? "font-bold" : ""
            }`}
            onClick={() =>
              navigate("/policies", { state: { section: "terms-of-service" } })
            }
          >
            Terms of Service
            <hr className="my-1 border-cream opacity-50" />
          </li>
          <li
            className={`cursor-pointer ${
              section === "privacy-policy" ? "font-bold" : ""
            }`}
            onClick={() =>
              navigate("/policies", { state: { section: "privacy-policy" } })
            }
          >
            Privacy Policy
            <hr className="my-1 border-cream opacity-50" />
          </li>
          <li
            className={`cursor-pointer ${
              section === "refund-policy" ? "font-bold" : ""
            }`}
            onClick={() =>
              navigate("/policies", { state: { section: "refund-policy" } })
            }
          >
            Refund Policy
            <hr className="my-1 border-cream opacity-50" />
          </li>
          <li
            className={`cursor-pointer ${
              section === "accessibility-statement" ? "font-bold" : ""
            }`}
            onClick={() =>
              navigate("/policies", {
                state: { section: "accessibility-statement" },
              })
            }
          >
            Accessibility Statement
            <hr className="my-1 border-cream opacity-50" />
          </li>
          <li
            className={`cursor-pointer ${
              section === "shipping-policy" ? "font-bold" : ""
            }`}
            onClick={() =>
              navigate("/policies", {
                state: { section: "shipping-policy" },
              })
            }
          >
            Shipping Policy
            <hr className="my-1 border-cream opacity-50" />
          </li>
        </ul>
      </div>

      <div className="w-3/4 p-6">
        <div className="text-center text-cream mt-6">
          {renderPolicyContent()}
        </div>
      </div>
    </div>
  );
};
