import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { placeOrderAPI } from "../api/orderapi";
import { createRazorpayOrderAPI , verifyRazorpayPaymentAPI } from "../api/paymentapi";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔢 Calculate total price
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // 🧾 Place order handler
  const handlePlaceOrder = async () => {
    setError("");

    if (!address || !city || !phone) {
      setError("Please fill all delivery details");
      return;
    }

    try {
      setLoading(true);

      const orderRes= await placeOrderAPI({
        address,
        city,
        phone,
      });

      const orderId=orderRes.data.order._id;

      //create razorpay order

      const razorRes=await createRazorpayOrderAPI(orderId);
      const {razorpayOrder,key_id}=razorRes.data;
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

      clearCart(); // clear frontend cart
      navigate("/order-success");
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to place order"
      );
    } finally {
      setLoading(false);
    }
  };

  // 🛑 Empty cart protection
  if (cart.length === 0) {
    return (
      <p className="text-center mt-20 text-gray-600">
        Your cart is empty.
      </p>
    );
  }
      }

  return (
    <section className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-16">

        <h1 className="text-3xl font-bold mb-10">
          Checkout
        </h1>

        <div className="grid md:grid-cols-3 gap-10">

          {/* LEFT — DELIVERY DETAILS */}
          <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-6">
              Delivery Details
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full border rounded px-4 py-2"
              />

              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full border rounded px-4 py-2"
              />

              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border rounded px-4 py-2"
              />

              {error && (
                <p className="text-red-500 text-sm">
                  {error}
                </p>
              )}
            </div>
          </div>

          {/* RIGHT — ORDER SUMMARY */}
          <div className="bg-white p-6 rounded-xl shadow-sm h-fit">

            <h2 className="text-xl font-semibold mb-4">
              Order Summary
            </h2>

            <div className="space-y-3 mb-6">
              {cart.map((item) => (
                <div
                  key={item.product._id}
                  className="flex justify-between text-sm"
                >
                  <span>
                    {item.product.name} × {item.quantity}
                  </span>
                  <span>
                    ₹{item.product.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-between font-semibold text-lg mb-6">
              <span>Total</span>
              <span>₹{totalPrice}</span>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={loading}
              className="w-full bg-green-700 text-white py-3 rounded-lg
                         hover:bg-green-800 transition disabled:opacity-60"
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>

            <button
              onClick={() => navigate("/cart")}
              className="w-full mt-3 text-green-700 text-sm hover:underline"
            >
              Back to Cart
            </button>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Checkout;
