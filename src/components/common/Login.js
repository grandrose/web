import React, { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { CoreButton } from "../theme";
import { useCustomer } from "../../context/CustomerContext";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

export const Login = ({ isModalOpen, toggleModal }) => {
  const loginRef = useRef(null);
  const { login, signUp, loginWithGoogle, isLoading } = useCustomer();
  const [isIPhone, setIsIPhone] = useState(false);

  useEffect(() => {
    // Check if the user is on an iPhone
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/iPhone|iPad|iPod/i.test(userAgent)) {
      setIsIPhone(true);
    }
  }, []);

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
    const email = e.target.email.value;
    const password = e.target.password.value;
    login(email, password)
      .then(() => {
        toggleModal();
      })
      .catch((error) => {
        console.error("Login error:", error);
      });
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const { data: googleUser } = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );
        const { email } = googleUser;

        // Use the loginWithGoogle function from your CustomerContext
        loginWithGoogle(email, response.access_token);
        toggleModal();
      } catch (error) {
        console.error("Google login error:", error);
      }
    },
    onError: (error) => {
      console.error("Google OAuth error:", error);
    },
  });

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-end px-12 py-9 z-50">
          <div
            ref={loginRef}
            className="relative bg-cream text-charcoal rounded-lg w-full max-w-lg p-8"
          >
            <button
              onClick={toggleModal}
              className="absolute top-4 right-4 text-charcoal"
            >
              <IoClose size={24} />
            </button>

            <h2 className="text-2xl mb-4 font-medium text-center">
              Welcome Back
            </h2>

            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <input
                type="email"
                name="email"
                placeholder="email"
                className="w-full px-4 py-2 border border-charcoal rounded-full bg-transparent text-charcoal focus:outline-none"
              />
              <input
                type="password"
                name="password"
                placeholder="password"
                className="w-full px-4 py-2 border border-charcoal rounded-full bg-transparent text-charcoal focus:outline-none"
              />
              <div className="mt-8">
                <h3 className="text-center text-2xl font-medium mb-4">
                  Create Account
                </h3>
                <div className="flex flex-col gap-4">
                  <button
                    onClick={googleLogin}
                    className="w-full px-4 py-2 flex items-center justify-center border border-charcoal rounded-full bg-transparent text-charcoal hover:bg-charcoal hover:text-cream transition"
                    disabled={isLoading}
                  >
                    <span className="mr-2">G</span> Continue with Google
                  </button>
                  {isIPhone && (
                    <button
                      onClick={() => console.log("TODO: Apple Login")}
                      className="w-full px-4 py-2 flex items-center justify-center border border-charcoal rounded-full bg-transparent text-charcoal hover:bg-charcoal hover:text-cream transition"
                      disabled={isLoading}
                    >
                      <span className="mr-2"></span> Continue with Apple
                    </button>
                  )}
                </div>
                <p className="text-center text-xs mt-4">
                  By signing up you agree to our{" "}
                  <span
                    className="font-bold hover:cursor-pointer"
                    onClick={() => console.log("TODO")}
                  >
                    Terms and Privacy Policy
                  </span>
                </p>
              </div>
              <CoreButton label="LOGIN" type="submit" disabled={isLoading} />
            </form>
          </div>
        </div>
      )}
    </>
  );
};
