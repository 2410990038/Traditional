import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { sendOrderEmail } from "../utils/emailService";

export default function Payment() {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const [method, setMethod] = useState("cod"); // cod | upi | card
  const [processing, setProcessing] = useState(false);

  const checkoutData = useMemo(() => {
    try {
      const raw = localStorage.getItem("checkoutData");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }, []);

  const cartSubtotal = cart.reduce((sum, i) => sum + i.priceValue * (i.qty || 1), 0);
  const alterationFeePerItem = 150;
  const alterationCount = cart.reduce((sum, i) => sum + (i.fitType === "custom" ? (i.qty || 1) : 0), 0);
  const alterationTotal = alterationCount * alterationFeePerItem;
  const taxAmount = Math.round(cartSubtotal * 0.1);
  const grandTotal = cartSubtotal + alterationTotal + taxAmount;

  // If cart is empty and no order in progress, redirect to cart
  useEffect(() => {
    if (cart.length === 0) {
      // allow coming from confirmation refresh by checking lastOrder
      const lastOrder = localStorage.getItem("lastOrder");
      if (!lastOrder) navigate("/cart");
    }
  }, [cart.length, navigate]);

  const handlePayNow = () => {
    setProcessing(true);
    setTimeout(() => {
      const orderId = `RR-${Date.now().toString().slice(-8)}`;
      const order = {
        id: orderId,
        items: cart,
        totals: {
          subtotal: cartSubtotal,
          alterationCount,
          alterationFeePerItem,
          alterationTotal,
          taxAmount,
          grandTotal,
        },
        shipping: checkoutData,
        paymentMethod: method,
        placedAt: new Date().toISOString(),
      };
      try {
        localStorage.setItem("lastOrder", JSON.stringify(order));
      } catch {}
      // Fire-and-forget email (requires VITE_ORDER_EMAIL_WEBHOOK_URL)
      try {
        const to = checkoutData?.email;
        if (to) {
          // do not await to keep UI responsive
          sendOrderEmail({ to, order }).catch(() => {});
        }
      } catch {}
      clearCart();
      navigate("/order-confirmation");
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#fdfbe8] pt-24 pb-12">
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Payment Methods */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-6">Payment</h1>

          <div className="space-y-4">
            <label className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer ${method === "cod" ? "border-green-500" : "border-gray-300"}`}>
              <input type="radio" name="method" checked={method === "cod"} onChange={() => setMethod("cod")} />
              Cash on Delivery (Recommended)
            </label>

            <label className={`block p-3 border rounded-lg ${method === "upi" ? "border-green-500" : "border-gray-300"}`}>
              <div className="flex items-center gap-3">
                <input type="radio" name="method" checked={method === "upi"} onChange={() => setMethod("upi")} />
                UPI
              </div>
              {method === "upi" && (
                <input type="text" placeholder="yourname@upi" className="mt-3 w-full border rounded px-3 py-2" />
              )}
            </label>

            <label className={`block p-3 border rounded-lg ${method === "card" ? "border-green-500" : "border-gray-300"}`}>
              <div className="flex items-center gap-3">
                <input type="radio" name="method" checked={method === "card"} onChange={() => setMethod("card")} />
                Credit/Debit Card
              </div>
              {method === "card" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                  <input type="text" placeholder="Card Number" className="border rounded px-3 py-2 col-span-2" />
                  <input type="text" placeholder="MM/YY" className="border rounded px-3 py-2" />
                  <input type="text" placeholder="CVV" className="border rounded px-3 py-2" />
                  <input type="text" placeholder="Name on Card" className="border rounded px-3 py-2 col-span-2" />
                </div>
              )}
            </label>

            <button
              disabled={processing}
              onClick={handlePayNow}
              className={`w-full mt-4 ${processing ? "bg-green-400" : "bg-green-600 hover:bg-green-700"} text-white py-3 rounded-lg font-bold transition`}
            >
              {processing ? "Processing..." : `Pay ₹${grandTotal.toLocaleString()}`}
            </button>

            <button onClick={() => navigate("/checkout")} className="w-full bg-gray-300 text-gray-800 py-3 rounded-lg hover:bg-gray-400 font-semibold transition mt-3">
              Back to Checkout
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
          <div className="space-y-2 border-b pb-4 mb-4 max-h-64 overflow-y-auto">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-gray-700">{item.name} × {item.qty || 1}</span>
                <span className="font-semibold">₹{(item.priceValue * (item.qty || 1)).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="space-y-2 border-b pb-4 mb-4">
            <div className="flex justify-between text-gray-700">
              <span>Subtotal</span>
              <span className="font-semibold">₹{cartSubtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Alteration charges ({alterationCount} × ₹{alterationFeePerItem})</span>
              <span className="font-semibold">₹{alterationTotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Tax (10%)</span>
              <span className="font-semibold">₹{taxAmount.toLocaleString()}</span>
            </div>
          </div>
          <div className="flex justify-between text-2xl font-bold text-green-600">
            <span>Total</span>
            <span>₹{grandTotal.toLocaleString()}</span>
          </div>

          {checkoutData && (
            <div className="mt-6 text-sm text-gray-700">
              <h3 className="font-semibold mb-2">Shipping to</h3>
              <p>{checkoutData.firstName} {checkoutData.lastName}</p>
              <p>{checkoutData.address}</p>
              <p>{checkoutData.city}, {checkoutData.state} - {checkoutData.pincode}</p>
              <p>Phone: {checkoutData.phone}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
