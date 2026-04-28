import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";

const CartItem = ({ item }) => {


  const { updateCartItem, removeFromCart } = useCart();

  const image = item.product?.images?.[0];
  const imagePath = image?.url || image;
  const imageUrl = imagePath
    ? imagePath.startsWith("http")
      ? imagePath
      : `http://localhost:5000${imagePath}`
    : "/placeholder.png";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-5 rounded-xl shadow-sm flex gap-6 hover:shadow-md transition"
    >
      {/* 🖼️ Product Image */}
      <div className="w-28 h-28 flex-shrink-0">
      <img
  src={imageUrl}
  alt={item.product.name}
  onError={(e) => {
    e.target.src = "/placeholder.png";
  }}
  className="w-full h-full object-cover rounded-lg"
/>
      </div>

      {/* 📦 Product Details */}
      <div className="flex-1">
        <h3 className="font-semibold text-lg text-gray-800">
          {item.product.name}
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          Farmer: {item.product.farmer || "Local Farmer"}
        </p>

        <p className="text-sm text-gray-500">
          Category: {item.product.category || "Vegetables"}
        </p>

        <p className="text-sm text-green-700 font-medium mt-2">
          ₹{(item.product.price ||0)*item.quantity} / {item.product.unit || "kg"}
        </p>

        {/* Quantity Controls */}
        <div className="flex items-center gap-3 mt-3">
          <button
            onClick={() =>
              updateCartItem(item.product._id, item.quantity - 1)
            }
            className="w-8 h-8 rounded-full border text-lg hover:bg-gray-100"
          >
            −
          </button>

          <span className="font-semibold">{item.quantity}</span>

          <button
            onClick={() =>
              updateCartItem(item.product._id, item.quantity + 1)
            }
            className="w-8 h-8 rounded-full border text-lg hover:bg-gray-100"
          >
            +
          </button>

          <button
            onClick={() => removeFromCart(item.product._id)}
            className="text-red-500 text-sm ml-4 hover:underline"
          >
            Delete
          </button>
        </div>
      </div>

      {/* 💰 Price Section */}
      <div className="text-right">
        <p className="text-lg font-bold text-gray-800">
          ₹{item.product.price * item.quantity}
        </p>

        <p className="text-sm text-gray-500">
          ({item.product.price} x {item.quantity})
        </p>
      </div>
    </motion.div>
  );
};

export default CartItem;