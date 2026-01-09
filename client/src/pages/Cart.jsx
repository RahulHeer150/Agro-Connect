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
          <p className="text-gray-600">Your cart is empty.</p>
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
