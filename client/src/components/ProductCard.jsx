import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from "../context/CartContext";
import {useAuth} from "../context/AuthContext";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuth();
  const { addToCart } = useCart();
  const apiBaseUrl = import.meta.env.VITE_API_URL || "https://agro-connect-8yjz.onrender.com";

  const handleAddToCart = async () => {

    if (!isLoggedIn) {
      alert("Please login to add products to cart");
      navigate("/login");
      return;
    }
    if(user?.role !=="buyer"){
      alert("Only buyers can add products to cart");
      return;
    }
    try {
      await addToCart(product._id, 1);
      alert("Product added to cart ✅");
    } catch (error) {
      console.error(error);
      alert("Failed to add to cart ❌");
    }
  };

  const productImage = product.images?.[0];
  const imagePath = productImage?.url || productImage;
  const imageUrl = imagePath?.startsWith("http")
    ? imagePath
    : `${apiBaseUrl}${imagePath}`;

  return (
    <div
      onClick={() => navigate(`/product/${product._id}`)}
      className="cursor-pointer bg-white rounded-xl shadow hover:shadow-xl hover:scale-105 transition duration-300 p-4"
    >
      <img
        src={imageUrl}
        alt={product.name}
        className="w-full h-40 object-cover rounded-lg"
      />

      <h3 className="mt-3 text-lg font-semibold">{product.name}</h3>

      <p className="text-gray-500 text-sm">{product.category}</p>

      <div className="flex justify-between items-center mt-2">
        <span className="text-green-600 font-bold">
          ₹{product.price}
        </span>

       <button
  onClick={(e) => {
    e.stopPropagation();
    handleAddToCart();
  }}
  className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-700"
>
  Buy
</button>
      </div>
    </div>
  );
};

export default ProductCard;