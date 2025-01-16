import { cartLight, snowLogo, userDark, userLight } from "@assets";
import { useCart, useCustomer } from "@context";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Cart } from "./Cart";
import { Login } from "./Login";

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isOpen, toggleCart } = useCart();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { customer } = useCustomer();

  const toggleLogin = () => {
    setIsLoginOpen(!isLoginOpen);
  };

  const profileOnClick = () => {
    if (customer) {
      navigate("/profile");
    } else {
      toggleLogin();
    }
  };

  useEffect(() => {
    if (location.state?.showLogin) {
      setIsLoginOpen(true);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  return (
    <>
      <nav
        className="bg-dark text-cream flex items-center justify-between px-[16.15vw] py-[20px] fixed top-0 left-0 w-full z-50"
        style={{ borderColor: "rgba(248, 241, 241, 0.08)" }}
      >
        {/* Left Section */}
        <div className="flex items-center text-xl gap-[50px] text-cream font-medium">
          <span
            className={`relative hover:cursor-pointer group ${
              location.pathname === "/shop" ? "underline-active" : ""
            }`}
            onClick={() => {
              navigate("/shop");
            }}
          >
            shop
            <span
              className={`absolute left-0 -bottom-0 h-[2px] w-full bg-current origin-left transition-transform duration-300 ${
                location.pathname === "/shop" ? "scale-x-100" : "scale-x-0"
              } group-hover:scale-x-100`}
            ></span>
          </span>
          <span
            className={`relative hover:cursor-pointer group ${
              location.pathname === "/locate" ? "underline-active" : ""
            }`}
            onClick={() => {
              navigate("/locate");
            }}
          >
            locate
            <span
              className={`absolute left-0 -bottom-0 h-[2px] w-full bg-current origin-left transition-transform duration-300 ${
                location.pathname === "/locate" ? "scale-x-100" : "scale-x-0"
              } group-hover:scale-x-100`}
            ></span>
          </span>
          <span
            className={`relative hover:cursor-pointer group ${
              location.pathname === "/about" ? "underline-active" : ""
            }`}
            onClick={() => {
              navigate("/about");
            }}
          >
            about
            <span
              className={`absolute left-0 -bottom-0 h-[2px] w-full bg-current origin-left transition-transform duration-300 ${
                location.pathname === "/about" ? "scale-x-100" : "scale-x-0"
              } group-hover:scale-x-100`}
            ></span>
          </span>
        </div>

        {/* Center Section - Logo */}
        <div
          className="absolute left-1/2 transform -translate-x-1/2 text-[50px] font-bold hover:text-rose transition-all duration-200 cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          <img className="max-w-[200px] h-auto" src={snowLogo} alt="Logo" />
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Cart Icon */}
          <button
            onClick={toggleCart}
            className="w-10 h-10 rounded-full flex items-center justify-center"
            // className="w-10 h-10 rounded-full flex items-center justify-center bg-transparent hover:bg-cream transition-all group"
          >
            <img
              src={cartLight}
              alt="Cart"
              className="w-[32px] h-[32px] group-hover:hidden"
            />
          </button>

          {/* Profile Icon */}
          <button
            onClick={profileOnClick}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-cream transition-all group"
            // className="w-10 h-10 rounded-full flex items-center justify-center bg-transparent hover:bg-cream transition-all group"
          >
            <img
              src={userLight}
              alt="User"
              className="w-[32px] h-[32px] group-hover:hidden"
            />
            <img
              src={userDark}
              alt="User Hover"
              className="w-[32px] h-[32px] hidden group-hover:block"
            />
          </button>
        </div>
      </nav>

      <Cart isModalOpen={isOpen} toggleModal={toggleCart} />
      <Login isModalOpen={isLoginOpen} toggleModal={toggleLogin} />
    </>
  );
};
