import React, { createContext, useContext, useState, useEffect } from "react";
import {
  snowLogo,
  nightLogo,
  userLight,
  userDark,
  cartLight,
  cartDark,
} from "@assets";
import { useLocation } from "react-router-dom";

const themeOptions = {
  default: {
    bodyClasses: "bg-charcoal text-cream",
    navClasses: "bg-charcoal text-cream",
    borderColor: "border-cream",
    logo: snowLogo,
    cartIcon: cartLight,
    cartIconHover: cartDark,
    userIcon: userLight,
    userIconHover: userDark,
    dark: "bg-charcoal",
    light: "bg-cream",
  },
  blossom: {
    bodyClasses: "bg-cream text-charcoal",
    navClasses: "bg-cream text-charcoal",
    borderColor: "border-charcoal",
    logo: nightLogo,
    cartIcon: cartDark,
    cartIconHover: cartLight,
    userIcon: userDark,
    userIconHover: userLight,
    dark: "bg-cream",
    light: "bg-charcoal",
  },
};

const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
  const location = useLocation();
  const [themeName, setThemeName] = useState("default");
  const [theme, setTheme] = useState(themeOptions.default);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const product = params.get("product");

    if (location.pathname === "/shop" && product === "blossom") {
      setThemeName("blossom");
    } else {
      setThemeName("default");
    }
  }, [location]);

  useEffect(() => {
    setTheme(themeOptions[themeName]);
  }, [themeName]);

  return (
    <ThemeContext.Provider value={{ themeName, theme }}>
      {children}
    </ThemeContext.Provider>
  );
}
