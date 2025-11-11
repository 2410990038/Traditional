import { 
  SignedIn, 
  SignedOut, 
  SignInButton, 
  useUser, 
  UserButton,
  useAuth 
} from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

export default function Navbar() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const { isSignedIn } = useAuth();
  const [cartCount, setCartCount] = useState(0);

  // Listen for cart updates
  useEffect(() => {
    const updateCart = () => {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        try {
          const cart = JSON.parse(savedCart);
          const count = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
          setCartCount(count);
        } catch (error) {
          console.error("Error updating cart count:", error);
          setCartCount(0);
        }
      } else {
        setCartCount(0);
      }
    };

    updateCart();
    window.addEventListener("cartUpdated", updateCart);
    return () => window.removeEventListener("cartUpdated", updateCart);
  }, []);

  return (
    <nav className="flex justify-between items-center px-8 md:px-12 py-4 bg-[#fcf9eb]/90 backdrop-blur-md shadow-md fixed top-0 left-0 w-full z-30">
      <button
        onClick={() => navigate("/")}
        className="text-2xl md:text-3xl font-semibold text-gray-800 tracking-wide hover:text-orange-600 transition cursor-pointer"
      >
        ReetRiwaaz
      </button>

      <div className="hidden md:flex items-center gap-6 text-gray-700 font-medium">
        <button className="hover:text-orange-600 transition" onClick={() => navigate("/")}>
          Home
        </button>
        <button className="hover:text-orange-600 transition" onClick={() => navigate("/shop")}>
          Shop
        </button>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/cart")}
          className="relative w-10 h-10 bg-orange-500 text-white rounded-full flex justify-center items-center hover:bg-orange-600 transition hover:scale-110"
        >
          <FaShoppingCart className="text-white text-xl" />
          {cartCount > 0 && (
            <span className="absolute top-0 right-0 text-xs bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse">
              {cartCount}
            </span>
          )}
        </button>

        <div className="relative">
          <SignedIn>
            <button
              className="w-10 h-10 rounded-full border-2 border-orange-500 overflow-hidden hover:scale-105 transition"
              onClick={() => setShowProfile(!showProfile)}
            >
              <img
                src={user?.imageUrl || "https://via.placeholder.com/40"}
                alt="User avatar"
                className="w-full h-full object-cover"
              />
            </button>

            {showProfile && (
              <>
                <div className="absolute right-0 mt-12 w-56 bg-white shadow-xl rounded-lg border border-gray-200 p-4 z-40">
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={user?.imageUrl || "https://via.placeholder.com/40"}
                      alt="User"
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-semibold text-gray-800">{user?.fullName || "User"}</p>
                      <p className="text-sm text-gray-500">
                        {user?.primaryEmailAddress?.emailAddress}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 my-3 pt-3 space-y-2">
                    <button
                      onClick={() => {
                        navigate("/cart");
                        setShowProfile(false);
                      }}
                      className="w-full text-left px-3 py-2 text-gray-700 hover:bg-orange-50 rounded transition"
                    >
                      🛒 My Cart ({cartCount})
                    </button>
                  </div>

                  <div className="border-t border-gray-200 my-3 pt-3">
                    <UserButton afterSignOutUrl="/" />
                  </div>
                </div>
                <div
                  className="fixed inset-0 z-30"
                  onClick={() => setShowProfile(false)}
                />
              </>
            )}
          </SignedIn>

          <SignedOut>
            <SignInButton
              afterSignInUrl="/shop"
              afterSignUpUrl="/shop"
              mode="modal"
              appearance={{
                elements: {
                  rootBox: "bg-orange-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-orange-600 transition",
                },
              }}
            />
          </SignedOut>
        </div>
      </div>
    </nav>
  );
}