import React from "react";
import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cart } = useCart();
  return (
    <section className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-10">Your Cart</h1>

        {cart.length === 0 ? (
          <p className="text-gray-600">Your Cart is empty.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-10">
            // Cart items
            <div className="md:col-span-2 space-y-6">
              {cart.map((item, index) => (
                <CartItem key={index} item={item} />
              ))}
            </div>
            //summary
            <CartSummary />
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
