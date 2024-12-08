import { GoogleOAuthProvider } from "@react-oauth/google";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.css";
import { Footer, Navbar } from "./components/common";
import { CartProvider } from "./context/CartContext";
import { CustomerProvider, useCustomer } from "./context/CustomerContext";
import {
  About,
  ComingSoon,
  DevHome,
  Documents,
  Home,
  NotFound,
  Playground,
  Policies,
  Shop,
} from "./pages";

function App() {
  return (
    <GoogleOAuthProvider clientId="TODO">
      <CustomerProvider>
        <CartProvider>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<DevHome />} />
                <Route path="/home" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/locate" element={<ComingSoon />} />
                <Route path="/about" element={<About />} />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <ComingSoon />
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

  return (
    <>
      {location.pathname !== "/" && location.pathname !== "/playground" && (
        <div className="mt-[100px]">
          <Navbar />
        </div>
      )}
      {children}
      {location.pathname !== "/" && location.pathname !== "/playground" && (
        <div
          className="bg-charcoal relative h-[300px]"
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
  const { customer } = useCustomer();

  if (!customer) {
    return <Navigate to="/home" state={{ showLogin: true }} replace />;
  }

  return children;
};

export default App;
