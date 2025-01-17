import { Footer, MobileNavbar, Navbar } from "@components";
import { CartProvider, CustomerProvider, useCustomer } from "@context";
import {
  About,
  ComingSoon,
  Customer,
  Documents,
  Home,
  NotFound,
  Playground,
  Policies,
  Shop,
} from "@pages";
import { GoogleOAuthProvider } from "@react-oauth/google";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import { ClipLoader } from "react-spinners";
import "./App.css";

function App() {
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const verified = localStorage.getItem("_bKaC");
    if (verified === btoa("true")) {
      setIsVerified(true);
    }
  }, []);

  if (!isVerified) {
    return <PasswordPage onPasswordSuccess={() => setIsVerified(true)} />;
  }

  const ScrollToTop = () => {
    const { pathname, search } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname, search]);
    return null;
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <CustomerProvider>
        <CartProvider>
          <Router>
            <ScrollToTop />
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/locate" element={<ComingSoon />} />
                <Route path="/about" element={<About />} />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Customer />
                    </ProtectedRoute>
                  }
                />
                <Route path="/policies" element={<Policies />} />
                <Route path="/documents" element={<Documents />} />
                <Route path="/playground" element={<Playground />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </Router>
        </CartProvider>
      </CustomerProvider>
    </GoogleOAuthProvider>
  );
}

const Layout = ({ children }) => {
  const location = useLocation();
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });

  return (
    <>
      {isDesktop ? (
        <div className="mt-[81px]">
          <Navbar />
        </div>
      ) : (
        <div className="mt-[70px]">
          <MobileNavbar />
        </div>
      )}
      {children}
      {location.pathname !== "/playground" && (
        <div
          className="bg-dark relative h-[300px]"
          style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
        >
          <div
            className="fixed bottom-0 h-[300px] w-full"
            style={{ borderTop: "1px solid rgba(248, 241, 241, 0.1)" }}
          >
            <Footer />
          </div>
        </div>
      )}
    </>
  );
};

const ProtectedRoute = ({ children }) => {
  const { customer, isLoading, hasLoaded } = useCustomer();

  if (isLoading || !hasLoaded) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ClipLoader color="#6b0808" size={50} />
      </div>
    );
  }
  if (!customer) {
    return <Navigate to="/" state={{ showLogin: true }} replace />;
  }
  return children;
};

const PasswordDropdown = ({ onPasswordSuccess }) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === process.env.REACT_APP_GRAND_ROSE_PASS) {
      localStorage.setItem("_bKaC", btoa("true"));
      onPasswordSuccess();
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative">
      {/* Dropdown Toggle Button */}
      <button
        onClick={toggleDropdown}
        className={`w-full px-4 py-2 flex justify-between items-center bg-charcoal text-cream rounded-t-[18px] border-2 border-cream shadow-lg transition-all duration-300 ${
          isOpen ? "rounded-b-none" : "rounded-[18px]"
        }`}
      >
        <span>Enter</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className={`w-6 h-6 transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Content */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="w-full bg-charcoal text-cream p-2 rounded-b-[18px] shadow-md border-2 border-cream border-t-0">
          <div className="w-full max-w-md mx-auto bg-cream text-charcoal rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Enter Password
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 border border-charcoal rounded-lg focus:outline-none focus:ring focus:ring-rose"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-charcoal border-2 border-charcoal text-cream rounded-full font-medium hover:bg-transparent hover:text-charcoal transition-all duration-200"
              >
                Submit
              </button>
            </form>
            {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

const PasswordPage = ({ onPasswordSuccess }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-charcoal text-cream px-6">
      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold mb-2">Grand Rose</h1>
        <p className="text-lg">
          Our website is currently under development. Check back soon!
        </p>
      </div>
      <PasswordDropdown onPasswordSuccess={onPasswordSuccess} />
      {/* Instagram Section */}
      <div className="mt-10 text-center">
        <p className="text-lg">Follow us on Instagram for updates!</p>
        <a
          href="https://www.instagram.com/drinkgrandrose"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block px-6 py-2 bg-rose text-cream rounded-full border-2 border-rose font-medium hover:bg-cream hover:text-rose transition-all duration-200"
        >
          Follow @drinkgrandrose
        </a>
      </div>
    </div>
  );
};

export default App;
