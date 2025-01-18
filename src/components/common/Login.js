import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { IoClose, IoEye, IoEyeOff } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import GoogleIcon from "../../assets/icons/google.svg";
import { useCustomer } from "../../context/CustomerContext";
import { CoreButton, Loader } from "@theme";

export const Login = ({ isModalOpen, toggleModal }) => {
  const navigate = useNavigate();
  const loginRef = useRef(null);
  const { login, signUp, loginOrCreateGoogleCustomer, isLoading } =
    useCustomer();
  const [isIPhone, setIsIPhone] = useState(false);
  const [isSignupMode, setIsSignupMode] = useState(false);
  const [formError, setFormError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  useEffect(() => {
    // Detect if the user is on an iPhone
    setIsIPhone(/iPhone|iPad|iPod/i.test(navigator.userAgent));
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        isModalOpen &&
        loginRef.current &&
        !loginRef.current.contains(event.target)
      ) {
        setFormError("");
        toggleModal();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isModalOpen, toggleModal]);

  const handleAuth = async (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();
    const confirmPassword = e.target.confirmPassword?.value.trim();

    if (!email || !password || (isSignupMode && !confirmPassword)) {
      setFormError("All fields are required.");
      return;
    }

    if (isSignupMode && password !== confirmPassword) {
      setFormError("Passwords do not match.");
      return;
    }

    try {
      if (isSignupMode) {
        await signUp(email, password);
      } else {
        await login(email, password);
      }
      setFormError("");
      toggleModal();
    } catch (error) {
      setFormError(
        error?.message || "An unexpected error occurred. Please try again."
      );
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    scope: "openid profile email",
    onSuccess: async (response) => {
      try {
        // 1) Get the Google user info
        const { data: googleUser } = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );

        const { email } = googleUser;
        if (!email) {
          throw new Error("Failed to retrieve email from Google OAuth.");
        }

        // 2) Now handle "shopify logic" in our context
        await loginOrCreateGoogleCustomer(email, response.access_token);

        // 3) If everything is good, close the modal
        setFormError("");
        toggleModal();
      } catch (error) {
        console.error(error);
        setFormError("Google login failed. Please try again.");
      }
    },
    onError: (error) => {
      console.error(error);
      setFormError("Google OAuth failed. Please try again.");
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
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black bg-opacity-50 z-50">
                <Loader />
              </div>
            )}
            <button
              onClick={toggleModal}
              className="absolute top-4 right-4 text-charcoal"
            >
              <IoClose size={24} />
            </button>

            <h2 className="text-2xl mb-4 font-medium text-center">
              {isSignupMode ? "Create an Account" : "Welcome Back"}
            </h2>

            {formError && (
              <p className="text-red-600 text-sm text-center mb-4">
                {formError}
              </p>
            )}

            <form onSubmit={handleAuth} className="flex flex-col gap-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="w-full px-4 py-2 border border-charcoal rounded-full bg-transparent text-charcoal focus:outline-none text-center placeholder:text-center font-medium"
              />
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  required
                  className="w-full px-4 py-2 border border-charcoal rounded-full bg-transparent text-charcoal focus:outline-none text-center placeholder:text-center font-medium"
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? <IoEyeOff /> : <IoEye />}
                </button>
              </div>
              {isSignupMode && (
                <div className="relative">
                  <input
                    type={confirmPasswordVisible ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    required
                    className="w-full px-4 py-2 border border-charcoal rounded-full bg-transparent text-charcoal focus:outline-none text-center placeholder:text-center font-medium"
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2"
                    onClick={() =>
                      setConfirmPasswordVisible(!confirmPasswordVisible)
                    }
                  >
                    {confirmPasswordVisible ? <IoEyeOff /> : <IoEye />}
                  </button>
                </div>
              )}
              <CoreButton
                label={isSignupMode ? "SIGN UP" : "LOGIN"}
                type="submit"
                disabled={isLoading}
              />
            </form>

            <div className="mt-4 text-center">
              <button
                className="text-sm font-medium text-rose hover:underline"
                onClick={() => setIsSignupMode(!isSignupMode)}
              >
                {isSignupMode
                  ? "Already have an account? Log in"
                  : "Don't have an account? Sign up"}
              </button>
            </div>

            <div className="mt-8">
              <h3 className="text-center text-2xl font-medium mb-4">Or</h3>
              <div className="flex flex-col gap-4">
                <button
                  onClick={handleGoogleLogin}
                  className="w-full px-4 py-2 flex items-center justify-center border border-charcoal rounded-full bg-transparent text-charcoal hover:bg-charcoal hover:text-cream transition relative font-medium"
                  disabled={isLoading}
                >
                  <img
                    src={GoogleIcon}
                    alt="Google Icon"
                    className="absolute left-4 w-6 h-6"
                  />
                  Continue with Google
                </button>
                {isIPhone && (
                  <button
                    onClick={() => alert("Apple login is not implemented yet.")}
                    className="w-full px-4 py-2 flex items-center justify-center border border-charcoal rounded-full bg-transparent text-charcoal hover:bg-charcoal hover:text-cream transition relative font-medium"
                    disabled={isLoading}
                  >
                    <span className="absolute left-4 text-xl"></span>
                    Continue with Apple
                  </button>
                )}
              </div>
            </div>

            <p className="text-center text-xs mt-4">
              By signing up you agree to our{" "}
              <span
                className="font-bold hover:cursor-pointer"
                onClick={() => {
                  toggleModal();
                  navigate("/policies", {
                    state: { section: "terms-of-service" },
                  });
                }}
              >
                Terms and Privacy Policy
              </span>
            </p>
          </div>
        </div>
      )}
    </>
  );
};
