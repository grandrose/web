import React from "react";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { Button } from "../theme";
import { Cart } from "./Cart";

export const Navbar = () => {
  // const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();
  const { isOpen, toggleCart } = useCart();
  // const toggleCart = () => {
  //   setIsCartOpen(!isCartOpen);
  // };

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
          <Button
            variant="default"
            onClick={() => console.log("Locate clicked")}
          >
            LOCATE
          </Button>
        </div>

        <div
          className="text-[50px] font-bold hover:text-rose transition-all duration-200 cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          grand rose
        </div>

        <div className="flex items-center space-x-4">
          <Button
            variant="default"
            onClick={() => console.log("About clicked")}
          >
            ABOUT
          </Button>
          <Button variant="default" onClick={toggleCart} className="mr-[50px]">
            CART
          </Button>
          <button
            onClick={() => console.log("Profile clicked")}
            className="bg-cream text-charcoal p-2 rounded-full hover:bg-transparent hover:text-cream border-2 hover:border-cream transition-all"
          >
            <FaUser />
          </button>
        </div>
      </nav>

      {/* Cart Modal */}
      <Cart isModalOpen={isOpen} toggleModal={toggleCart} />
    </>
  );
};
