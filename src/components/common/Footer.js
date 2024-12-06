import React from "react";
import { EmailSubmission } from "../theme";

export const Footer = () => {
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
          <p className="hover:text-rose hover:cursor-pointer transition-all duration-200">
            Room for legal disclaimers, warnings, and product access
            information.
          </p>
          <p className="hover:text-rose hover:cursor-pointer transition-all duration-200">
            Privacy, personal info, and cookies
          </p>
          <p className="hover:text-rose hover:cursor-pointer transition-all duration-200">
            Terms and conditions of offers
          </p>
          <p className="hover:text-rose hover:cursor-pointer transition-all duration-200">
            Accessibility statement
          </p>
        </div>
      </div>
    </footer>
  );
};
