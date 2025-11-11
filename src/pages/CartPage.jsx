import { useState, useEffect } from "react";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error loading cart from localStorage:", error);
        setCart([]);
      }
    }
    setLoading(false);
  }, []);

  // Save cart to localStorage whenever it changes (but don't reset on mount)
  useEffect(() => {
    if (!loading && cart.length >= 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
      // Trigger navbar update
      window.dispatchEvent(new Event("cartUpdated"));
    }
  }, [cart, loading]);

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.id !== productId)
    );
  };

  // Update quantity
  const updateQuantity = (productId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, qty: newQty } : item
      )
    );
  };

  // Clear entire cart with confirmation
  const clearCart = () => {
    if (window.confirm("Are you sure you want to clear your entire cart?")) {
      setCart([]);
      localStorage.removeItem("cart");
      window.dispatchEvent(new Event("cartUpdated"));
    }
  };

  // Calculate totals
  const cartItemCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.priceValue * item.qty, 0);
  const taxAmount = Math.round(cartTotal * 0.1);
  const finalTotal = cartTotal + taxAmount;

  // Loading state
  if (loading) {
    return (
      <div className="p-10 bg-[#fdfbe8] min-h-screen">
        <h1 className="text-4xl font-bold text-center mb-10 ">🛒 Your Cart</h1>
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex justify-between items-center border-b py-3 animate-pulse">
                <div className="flex items-center space-x-4 w-full">
                  <div className="w-20 h-20 bg-gray-300 rounded"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  </div>
                </div>
                <div className="w-20 h-8 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Empty cart state
  if (cart.length === 0) {
    return (
      <div className="p-10 bg-[#fdfbe8] min-h-screen">
        <h1 className="text-4xl font-bold text-center mb-10 mt-20">🛒 Your Cart</h1>
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-12 text-center">
          <p className="text-3xl mb-4">🛍️</p>
          <p className="text-2xl font-semibold text-gray-700 mb-4">Your bag is empty!</p>
          <p className="text-gray-600 mb-6">Start shopping to add items to your cart.</p>
          <a
            href="/shop"
            className="inline-block bg-orange-500 text-white px-6 py-3 rounded hover:bg-orange-600 font-semibold"
          >
            Continue Shopping
          </a>
        </div>
      </div>
    );
  }

  // Cart with items
  return (
    <div className="p-10 bg-[#fdfbe8] min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-10">🛒 Your Cart</h1>

      <div className="max-w-6xl mx-auto">
        {/* Cart Items */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Items List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">
                Shopping Bag ({cartItemCount} items)
              </h2>
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center border-b py-4 last:border-b-0 hover:bg-gray-50 p-2 rounded transition"
                  >
                    {/* Product Info */}
                    <div className="flex items-center space-x-4 flex-1">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <p className="text-gray-600 text-sm">{item.desc}</p>
                        <p className="text-green-600 font-semibold mt-1">
                          {item.price}
                        </p>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mx-4">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.qty - 1)
                        }
                        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                      >
                        −
                      </button>
                      <span className="font-semibold text-lg w-8 text-center">
                        {item.qty}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.qty + 1)
                        }
                        className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded"
                      >
                        +
                      </button>
                    </div>

                    {/* Item Total & Remove */}
                    <div className="text-right min-w-[120px]">
                      <p className="text-lg font-bold text-green-700">
                        ₹{(item.priceValue * item.qty).toLocaleString()}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 mt-2 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              {/* Breakdown */}
              <div className="space-y-3 border-b pb-4 mb-4">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span className="font-semibold">
                    ₹{cartTotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Items</span>
                  <span className="font-semibold">{cartItemCount}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span className="font-semibold text-green-600">FREE</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Tax (10%)</span>
                  <span className="font-semibold">
                    ₹{taxAmount.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between text-2xl font-bold mb-6 text-green-600">
                <span>Total</span>
                <span>₹{finalTotal.toLocaleString()}</span>
              </div>

              {/* Checkout Button */}
              <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-bold text-lg mb-3 transition">
                Proceed to Checkout
              </button>
              {/* Continue Shopping */}
              <a
                href="/shop"
                className="w-full block text-center bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 font-semibold transition"
              >
                Continue Shopping
              </a>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-center">
          <button
            onClick={clearCart}
            className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 font-semibold transition"
          >
            Clear Cart
          </button>
        </div>

        {/* Order Info Box */}
        <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 rounded p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            📦 Delivery Information
          </h3>
          <p className="text-blue-800 text-sm">
            • Free shipping on all orders<br />
            • Expected delivery: 5-7 business days<br />
            • 30-day returns & exchanges<br />
            • 100% authentic ethnic wear
          </p>
        </div>
      </div>
    </div>
  );
}