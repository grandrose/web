import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { Button } from "../theme";
import { Cart } from "./Cart";
import { Login } from "./Login";
import { useCustomer } from "../../context/CustomerContext";
import UserIcon from "../../assets/icons/gr-rose-user-icon.png";

export const Navbar = () => {
  const navigate = useNavigate();
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

  return (
    <>
      <nav className="bg-charcoal text-cream flex items-center justify-between px-[50px] py-[20px] fixed top-0 left-0 w-full z-50">
        <div className="flex items-center space-x-4">
          <Button
            variant="default"
            onClick={() => navigate("/shop")}
            className="ml-[50px]"
          >
            SHOP
          </Button>
          <Button variant="default" onClick={() => navigate("/locate")}>
            LOCATE
          </Button>
        </div>

        <div
          className="text-[50px] font-bold hover:text-rose transition-all duration-200 cursor-pointer"
          onClick={() => {
            navigate("/home");
          }}
        >
          grand rose
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="default" onClick={() => navigate("/about")}>
            ABOUT
          </Button>
          <Button variant="default" onClick={toggleCart} className="mr-[50px]">
            CART
          </Button>
          {/* DEFAULT USER ICON */}
          <button
            onClick={profileOnClick}
            className="bg-cream text-charcoal w-10 h-10 flex items-center justify-center rounded-full hover:bg-transparent hover:text-cream border-2 hover:border-cream transition-all"
          >
            <FaUser size={20} />
          </button>
          {/* <img
            src={UserIcon}
            className="max-w-[36px] max-h-[36px] hover:cursor-pointer"
            onClick={profileOnClick}
          /> */}
        </div>
      </nav>

      <Cart isModalOpen={isOpen} toggleModal={toggleCart} />
      <Login isModalOpen={isLoginOpen} toggleModal={toggleLogin} />
    </>
  );
};
