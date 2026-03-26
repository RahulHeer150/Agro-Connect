import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CartSummary = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm h-fit">
      <h3 className="font-semibold text-lg mb-4">Price Summary</h3>

      <div className="flex justify-between text-sm mb-2">
        <span>Total Items</span>
        <span>{totalItems}</span>
      </div>

      <div className="flex justify-between font-semibold text-lg mb-6">
        <span>Total Price</span>
        <span>₹{totalPrice}</span>
      </div>

      <button
        onClick={() => navigate("/checkout")}
        disabled={cart.length === 0}
        className="w-full bg-green-700 text-white py-3 rounded-lg
        hover:bg-green-800 transition disabled:opacity-50"
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default CartSummary;