import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const imageUrl = product.images?.[0]?.startsWith("http")
    ? product.images[0]
    : `http://localhost:5000${product.images?.[0]}`;

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
            e.stopPropagation(); // ❗ prevents navigation
            console.log("Buy clicked");
          }}
          className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm"
        >
          Buy
        </button>
      </div>
    </div>
  );
};

export default ProductCard;