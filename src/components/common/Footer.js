import React from "react";
import { useNavigate } from "react-router-dom";
import { EmailSubmission } from "../theme";

export const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="bg-charcoal text-cream sticky bottom-0 mt-10">
      <div className=" mx-auto px-32 py-8">
        <div className="text-left space-y-4 max-w-lg">
          <h4 className="text-sm font-bold">
            Our products are not for use by or sale to persons under the age of
            21.
          </h4>
          <p className="text-sm">
            All products contain less than 0.3% THC per the Controlled Substance
            Act. Consult your physician before use if you are pregnant, or are
            taking any medication.
          </p>
        </div>
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 text-left">
          <p
            className="font-bold hover:text-rose hover:cursor-pointer transition-all duration-200"
            onClick={() => navigate("/profile")}
          >
            My Account
          </p>
          <p
            className="font-bold hover:text-rose hover:cursor-pointer transition-all duration-200"
            onClick={() =>
              navigate("/policies", {
                state: { section: "terms-of-service" },
              })
            }
          >
            Terms of Service
          </p>
          <p
            className="font-bold hover:text-rose hover:cursor-pointer transition-all duration-200"
            onClick={() =>
              navigate("/policies", {
                state: { section: "shipping-policy" },
              })
            }
          >
            Shipping Policy
          </p>
          <p
            className="font-bold hover:text-rose hover:cursor-pointer transition-all duration-200"
            onClick={() =>
              navigate("/documents", {
                state: { section: "laboratory" },
              })
            }
          >
            Laboratory Certificates
          </p>
          <p
            className="font-bold hover:text-rose hover:cursor-pointer transition-all duration-200"
            onClick={() => navigate("/contact-us")}
          >
            Contact Us
          </p>
          <p
            className="font-bold hover:text-rose hover:cursor-pointer transition-all duration-200"
            onClick={() =>
              navigate("/policies", {
                state: { section: "refund-policy" },
              })
            }
          >
            Refund Policy
          </p>
          <p
            className="font-bold hover:text-rose hover:cursor-pointer transition-all duration-200"
            onClick={() =>
              navigate("/policies", {
                state: { section: "privacy-policy" },
              })
            }
          >
            Privacy Policy
          </p>
        </section>
      </div>
    </footer>
  );
};

// TODO - REMOVE IF NO LONGER NEEDED

export const OldFooter = () => {
  const navigate = useNavigate();
  return (
    <footer className="bg-charcoal text-cream sticky bottom-0 mt-10">
      <div className=" w-[calc(100%-200px)] mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center md:text-left">
          <h4 className="text-lg font-bold mb-2">Want exclusive discounts?</h4>
          {/* TODO */}
          <EmailSubmission
            placeholder="your@email.com"
            showButton={false}
            background="light"
            onSubmit={(email) => null}
          />
          <div className="mt-4">
            <p className="text-sm">Grand Rose</p>
            <p className="text-sm">Minneapolis, MN 55403</p>
            <p className="text-sm mt-2">&copy; 2024</p>
          </div>
        </div>

        <div></div>

        <div className="text-sm text-center md:text-right space-y-2 ">
          <p
            className="hover:text-rose hover:cursor-pointer transition-all duration-200"
            onClick={() => navigate("/policies")}
          >
            Room for legal disclaimers, warnings, and product access
            information.
          </p>
          <p
            className="hover:text-rose hover:cursor-pointer transition-all duration-200"
            onClick={() =>
              navigate("/policies", {
                state: { section: "privacy-policy" },
              })
            }
          >
            Privacy, personal info, and cookies
          </p>
          <p
            className="hover:text-rose hover:cursor-pointer transition-all duration-200"
            onClick={() =>
              navigate("/policies", {
                state: { section: "terms-of-service" },
              })
            }
          >
            Terms and conditions of offers
          </p>
          <p
            className="hover:text-rose hover:cursor-pointer transition-all duration-200"
            onClick={() =>
              navigate("/policies", {
                state: { section: "accessibility-statement" },
              })
            }
          >
            Accessibility statement
          </p>
        </div>
      </div>
    </footer>
  );
};
