import { useEffect, useMemo, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export default function OrderHistory() {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  const historyKey = useMemo(() => (user?.id ? `orders:${user.id}` : "orders:guest"), [user?.id]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      const raw = localStorage.getItem(historyKey);
      setOrders(raw ? JSON.parse(raw) : []);
    } catch {
      setOrders([]);
    }
  }, [isLoaded, historyKey]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcf9eb] pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Order History</h1>
          <button onClick={() => navigate(-1)} className="text-gray-600 hover:text-gray-800">← Back</button>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600 mb-4">No orders yet.</p>
            <button onClick={() => navigate('/shop')} className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600">Start Shopping</button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((o) => (
              <div key={o.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">Order {o.id}</div>
                    <div className="text-sm text-gray-500">{new Date(o.placedAt).toLocaleString()}</div>
                  </div>
                  <div className="text-green-700 font-bold">₹{(o.totals?.grandTotal || 0).toLocaleString()}</div>
                </div>
                <div className="mt-4 divide-y">
                  {o.items.map((it) => (
                    <div key={it.id} className="py-2 flex justify-between text-sm">
                      <div>
                        <div className="font-medium">{it.name}</div>
                        <div className="text-gray-500">Qty: {it.qty || 1}</div>
                        {it.fitType === 'custom' && (
                          <span className="text-xs text-green-700">Custom fit</span>
                        )}
                      </div>
                      <div className="font-semibold">₹{(it.priceValue * (it.qty || 1)).toLocaleString()}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-right">
                  <button onClick={() => {
                    localStorage.setItem('lastOrder', JSON.stringify(o));
                    navigate('/order-confirmation');
                  }} className="text-sm text-blue-600 hover:underline">View details</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}