import React, { useEffect, useState } from "react";
import { getMyOrdersAPI } from "../api/orderapi";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiBaseUrl = import.meta.env.VITE_API_URL || "https://agro-connect-8yjz.onrender.com";

  const defaultImage =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'%3E%3Crect width='300' height='300' fill='%23f3f4f6'/%3E%3Ctext x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-family='Arial,Helvetica,sans-serif' font-size='22'%3ENo Image%3C/text%3E%3C/svg%3E";

  const getImageUrl = (image) => {
    const imagePath = image?.url || image;
    if (!imagePath) {
      return defaultImage;
    }
    const path = String(imagePath).trim();
    if (!path) {
      return defaultImage;
    }
    if (path.startsWith("http")) {
      return path;
    }
    if (path.startsWith("/")) {
      return `${apiBaseUrl}${path}`;
    }
    return `${apiBaseUrl}/${path}`;
  };

  const fetchOrders = async () => {
    try {
      const res = await getMyOrdersAPI();
      setOrders(res.data.orders || []);
    } catch (error) {
      console.error("Failed to fetch orders", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return <p className="text-center mt-50 min-h-screen justify-center">Loading orders...</p>;
  }

  return (
    <section className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-10">My Orders</h1>

        {orders.length === 0 ? (
          <p className="text-gray-600">No orders placed yet.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white p-6 rounded-xl shadow-sm"
              >
                {/* Order Header */}
                <div className="flex justify-between mb-4">
                  <h2 className="font-semibold">
                    Order #{order._id.slice(-6)}
                  </h2>
                  <span className="text-green-700 font-medium">
                    {order.status}
                  </span>
                </div>


      


                {/* Items */}
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div
                      key={item.product._id}
                      className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
                    >
                      {/* Product Image */}
                      <div className="w-16 h-16 flex-shrink-0">
                        <img
                          src={getImageUrl(item.product?.images?.[0])}
                          alt={item.product?.name || "Product image"}
                          onError={(e) => {
                            e.currentTarget.src = defaultImage;
                          }}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800">
                          {item.product.name}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {item.quantity} × ₹{item.price}
                        </p>
                      </div>

                      {/* Item Total */}
                      <div className="text-right">
                        <span className="font-semibold text-gray-800">
                          ₹{item.quantity * item.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="flex justify-between mt-4 font-semibold">
                  <span>Total</span>
                  <span>₹{order.totalAmount}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MyOrders;