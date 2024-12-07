import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useCustomer } from "../../context/CustomerContext";
import { Button } from "../theme";
import { Cart } from "./Cart";
import { Login } from "./Login";
import { FaUser } from "react-icons/fa";

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
      <nav className="bg-charcoal text-cream flex items-center justify-between px-[50px] py-[20px] fixed top-0 left-0 w-full z-50">
        <div className="flex items-center space-x-4">
          <Button
            variant="default"
            onClick={() => navigate("/shop")}
            className="ml-[50px] font-medium"
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
          <Button
            variant="default"
            onClick={toggleCart}
            className="mr-[50px] font-medium"
          >
            CART
          </Button>
          <button
            onClick={profileOnClick}
            className="bg-cream text-charcoal w-10 h-10 flex items-center justify-center rounded-full hover:bg-transparent hover:text-cream border-2 hover:border-cream transition-all"
          >
            <FaUser size={20} />
          </button>
        </div>
      </nav>

      <Cart isModalOpen={isOpen} toggleModal={toggleCart} />
      <Login isModalOpen={isLoginOpen} toggleModal={toggleLogin} />
    </>
  );
};
