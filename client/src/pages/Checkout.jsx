import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { placeOrderAPI } from "../api/orderapi";
import {
  createRazorpayOrderAPI,
  verifyRazorpayPaymentAPI,
} from "../api/paymentapi";
import { loadRazorpay } from "../utils/loadRazorpay";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handlePayment = async () => {
    setError("");

    if (!address || !city || !phone) {
      setError("Please fill all delivery details");
      return;
    }

    try {
      setLoading(true);

      // 1️⃣ Create Order in DB
      const orderRes = await placeOrderAPI({
        address,
        city,
        phone,
      });

      const orderId = orderRes.data.order._id;

      // 2️⃣ Create Razorpay Order
      const razorRes = await createRazorpayOrderAPI(orderId);
      const { razorpayOrder, key_id } = razorRes.data;

      // 3️⃣ Load Razorpay SDK
      const loaded = await loadRazorpay();
      if (!loaded) {
        setError("Failed to load payment gateway");
        setLoading(false);
        return;
      }

      // 4️⃣ Open Razorpay Checkout
      const options = {
        key: key_id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "AgroConnect",
        description: "Farm Fresh Order Payment",
        order_id: razorpayOrder.id,

        handler: async function (response) {
          try {
            await verifyRazorpayPaymentAPI({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId,
            });

            clearCart();
            navigate("/order-success");
          } catch (err) {
            setError(
              err.response?.data?.message || "Payment verification failed"
            );
          }
        },

        prefill: {
          contact: phone,
        },

        theme: {
          color: "#16a34a",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      setError(err.response?.data?.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <p className="text-center mt-20 text-gray-600">Your cart is empty.</p>
    );
  }

  return (
    <section className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-10">Checkout & Payment</h1>

        <div className="grid md:grid-cols-3 gap-10">
          {/* Delivery */}
          <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-6">Delivery Details</h2>

            <div className="space-y-4">
              <input
                placeholder="Full Address"
                className="w-full border px-4 py-2 rounded"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <input
                placeholder="City"
                className="w-full border px-4 py-2 rounded"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <input
                placeholder="Phone Number"
                className="w-full border px-4 py-2 rounded"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
          </div>

          {/* Summary */}
          <div className="bg-white p-6 rounded-xl shadow-sm h-fit">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="flex justify-between font-semibold text-lg mb-6">
              <span>Total</span>
              <span>₹{totalPrice}</span>
            </div>

            <button
              onClick={handlePayment}
              disabled={loading}
              className="w-full bg-green-700 text-white py-3 rounded-lg
                         hover:bg-green-800 transition disabled:opacity-60"
            >
              {loading ? "Processing..." : "Pay Now"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
