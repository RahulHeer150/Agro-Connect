import React from "react";
import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cart, loading } = useCart();
  if (loading) {
    return <p className="text-center mt-20">Loading Cart...</p>;
  }
  return (
    <section className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-10">Your Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-xl font-semibold text-gray-700">
              Your cart is empty 🛒
            </h2>
            <p className="text-gray-500 mt-2">
              Start adding fresh crops from farmers

            </p>
            <button
  onClick={() => navigate("/")}
  className="mt-4 px-6 py-2 bg-green-700 text-white rounded"
>
  Continue Shopping
</button>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-10">
            {/* Cart Items */}
            <div className="md:col-span-2 space-y-6">
              {cart.map((item) => (
                <CartItem key={item.product._id} item={item} />
              ))}
            </div>

            {/* Summary */}
            <CartSummary />
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
