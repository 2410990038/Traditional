import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginModal from "./pages/LoginModal";
import { ClerkProvider } from "@clerk/clerk-react";
import Shop from "./pages/Shop";
import CartPage from "./pages/CartPage";
import Navbar from "./components/Navbar";
import BuyNow from "./pages/BuyNow"; // import BuyNow component
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

export default function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const openLogin = () => setShowLogin(true);

  return (
    <Router>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <Navbar
          onLoginClick={openLogin}
          isLoggedIn={isLoggedIn}
          onLogout={() => setIsLoggedIn(false)}
        />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginModal />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/buynow" element={<BuyNow />} /> {/* Add the BuyNow route here */}
        </Routes>
      </ClerkProvider>
    </Router>
  );
}
