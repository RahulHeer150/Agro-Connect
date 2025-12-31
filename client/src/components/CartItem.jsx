import { useCart } from "../context/CartContext";

const CartItem = ({ item }) => {
  const { updateCartItem, removeFromCart } = useCart();

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm flex justify-between items-center">

      {/* Product Info */}
      <div>
        <h3 className="font-semibold text-lg">
          {item.name}
        </h3>
        <p className="text-sm text-gray-600">
          Farmer: {item.farmer}
        </p>
        <p className="text-sm text-green-700 font-medium mt-1">
          ₹{item.price} / kg
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-4">

        <button
          onClick={() =>
            updateCartItem(item.id, item.quantity - 1)
          }
          className="w-8 h-8 rounded-full border text-lg
                     hover:bg-gray-100"
        >
          −
        </button>

        <span className="font-semibold">
          {item.quantity}
        </span>

        <button
          onClick={() =>
            updateCartItem(item.id, item.quantity + 1)
          }
          className="w-8 h-8 rounded-full border text-lg
                     hover:bg-gray-100"
        >
          +
        </button>

      </div>

      {/* Remove */}
      <button
        onClick={() => removeFromCart(item.id)}
        className="text-red-500 text-sm hover:underline"
      >
        Remove
      </button>

    </div>
  );
};

export default CartItem;
