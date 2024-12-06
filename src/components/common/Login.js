import React, { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { CoreButton } from "../theme";

export const Login = ({ isModalOpen, toggleModal }) => {
  const loginRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        isModalOpen &&
        loginRef.current &&
        !loginRef.current.contains(event.target)
      ) {
        toggleModal();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isModalOpen, toggleModal]);

  const handleLogin = (e) => {
    e.preventDefault();
    // TODO
    console.log("Login submitted");
  };

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4 py-6 z-50">
          <div
            ref={loginRef}
            className="relative bg-cream text-charcoal rounded-lg w-full max-w-sm p-8"
          >
            <button
              onClick={toggleModal}
              className="absolute top-4 right-4 text-charcoal"
            >
              <IoClose size={24} />
            </button>

            <h2 className="text-lg font-bold mb-4">Welcome Back</h2>

            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="email"
                className="w-full px-4 py-2 border border-charcoal rounded-full bg-transparent text-charcoal focus:outline-none"
              />
              <input
                type="password"
                placeholder="password"
                className="w-full px-4 py-2 border border-charcoal rounded-full bg-transparent text-charcoal focus:outline-none"
              />
              <CoreButton label="LOGIN" type="submit" className="w-full" />
            </form>

            <div className="mt-8">
              <h3 className="text-center text-md font-bold mb-4">
                Create Account
              </h3>
              <div className="flex flex-col gap-4">
                <button className="w-full px-4 py-2 flex items-center justify-center border border-charcoal rounded-full bg-transparent text-charcoal hover:bg-charcoal hover:text-cream transition">
                  <span className="mr-2"></span> Google filler button
                </button>
                <button className="w-full px-4 py-2 flex items-center justify-center border border-charcoal rounded-full bg-transparent text-charcoal hover:bg-charcoal hover:text-cream transition">
                  <span className="mr-2"></span> Apple filler button
                </button>
              </div>
              <p className="text-center text-xs mt-4">
                By signing up you agree to our {/* TODO */}
                <span
                  className="font-bold hover:cursor-pointer"
                  onClick={() => {
                    console.log("TODO");
                  }}
                >
                  Terms and Privacy Policy
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
