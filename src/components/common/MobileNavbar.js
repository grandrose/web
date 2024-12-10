import React, { useState } from "react";
import { FaBars, FaTimes, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Button } from "../theme";
import { useCart } from "../../context/CartContext";
import { useCustomer } from "../../context/CustomerContext";

export const MobileNavbar = () => {
  const navigate = useNavigate();
  const { isOpen, toggleCart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { customer } = useCustomer();

  const profileOnClick = () => {
    if (customer) {
      navigate("/profile");
    } else {
      // TODO
      // Handle login or signup flow
    }
  };

  return (
    <nav className="lg:hidden bg-charcoal text-cream fixed top-0 left-0 w-full z-50 border-b py-3 px-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-cream"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
          <div
            className="text-[30px] font-bold hover:text-rose transition-all duration-200 cursor-pointer"
            onClick={() => navigate("/home")}
          >
            grand rose
          </div>
        </div>
        <button
          onClick={() => {
            profileOnClick();
            setIsMenuOpen(false);
          }}
          className="bg-cream text-charcoal w-8 h-8 flex items-center justify-center rounded-full border-2"
        >
          <FaUser size={20} />
        </button>
      </div>
      {isMenuOpen && (
        <div className="bg-charcoal">
          <div className="flex flex-col items-start space-y-4 mt-6 px-4">
            <h1
              className=""
              onClick={() => {
                navigate("/shop");
                setIsMenuOpen(false);
              }}
            >
              SHOP
            </h1>
            <h1
              variant="default"
              onClick={() => {
                navigate("/locate");
                setIsMenuOpen(false);
              }}
            >
              LOCATE
            </h1>
            <h1
              variant="default"
              onClick={() => {
                navigate("/about");
                setIsMenuOpen(false);
              }}
            >
              ABOUT
            </h1>
            <h1
              variant="default"
              onClick={() => {
                toggleCart();
                setIsMenuOpen(false);
              }}
            >
              CART
            </h1>
          </div>
        </div>
      )}
    </nav>
  );
};
