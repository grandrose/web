import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoClose, IoEye, IoEyeOff } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import GoogleIcon from "../../assets/icons/google.svg";
import { useCustomer } from "../../context/CustomerContext";
import { CoreButton } from "../theme";

export const MobileLogin = ({ isModalOpen, toggleModal }) => {
  const navigate = useNavigate();
  const { login, signUp, loginOrCreateGoogleCustomer, isLoading } =
    useCustomer();
  const [isSignupMode, setIsSignupMode] = useState(false);
  const [formError, setFormError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isIPhone, setIsIPhone] = useState(false);

  useEffect(() => {
    setIsIPhone(/iPhone|iPad|iPod/i.test(navigator.userAgent));
  }, []);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setFormError("");
      toggleModal();
    }
  };

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

        await loginOrCreateGoogleCustomer(email, response.access_token);
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

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 z-10"
        onClick={handleOverlayClick}
      />

      {/* Bottom Sheet Content */}
      <div
        className="relative z-20 bg-cream text-charcoal rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-medium">
            {isSignupMode ? "Create an Account" : "Welcome Back"}
          </h2>
          <button
            onClick={() => {
              setFormError("");
              toggleModal();
            }}
            className="text-charcoal"
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Error Message */}
        {formError && (
          <p className="text-red-600 text-sm text-center mb-4">{formError}</p>
        )}

        {/* Form */}
        <form onSubmit={handleAuth} className="flex flex-col gap-4 mb-6">
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full px-4 py-2 border border-charcoal rounded-full bg-transparent text-charcoal text-center"
          />

          {/* Password Field */}
          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              placeholder="Password"
              required
              className="w-full px-4 py-2 border border-charcoal rounded-full bg-transparent text-charcoal text-center"
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? <IoEyeOff /> : <IoEye />}
            </button>
          </div>

          {/* Confirm Password if Signup */}
          {isSignupMode && (
            <div className="relative">
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                required
                className="w-full px-4 py-2 border border-charcoal rounded-full bg-transparent text-charcoal text-center"
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2"
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

        {/* Toggle Signup/Login */}
        <div className="text-center mb-6">
          <button
            className="text-sm font-medium text-rose hover:underline"
            onClick={() => setIsSignupMode(!isSignupMode)}
          >
            {isSignupMode
              ? "Already have an account? Log in"
              : "Don't have an account? Sign up"}
          </button>
        </div>

        {/* Other Login Methods */}
        <div className="flex flex-col gap-4">
          <button
            onClick={handleGoogleLogin}
            className="w-full px-4 py-2 flex items-center justify-center border border-charcoal rounded-full bg-transparent text-charcoal hover:bg-charcoal hover:text-cream transition relative"
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
              className="w-full px-4 py-2 flex items-center justify-center border border-charcoal rounded-full bg-transparent text-charcoal hover:bg-charcoal hover:text-cream transition relative"
              disabled={isLoading}
            >
              <span className="absolute left-4 text-xl"></span>
              Continue with Apple
            </button>
          )}
        </div>

        {/* Terms and Privacy */}
        <p className="text-center text-xs mt-4">
          By signing up you agree to our{" "}
          <span
            className="font-bold hover:cursor-pointer"
            onClick={() => {
              toggleModal();
              navigate("/policies", { state: { section: "terms-of-service" } });
            }}
          >
            Terms and Privacy Policy
          </span>
        </p>
      </div>
    </div>
  );
};
