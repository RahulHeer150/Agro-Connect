const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition">
      
      {/* Image Placeholder */}
      <div className="h-40 bg-gray-100 rounded-t-xl flex items-center justify-center">
        <span className="text-gray-400 text-sm">Product Image</span>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-lg">
          {product.name}
        </h3>

        <p className="text-green-700 font-medium">
          ₹{product.price} / kg
        </p>

        <p className="text-sm text-gray-600 mt-1">
          {product.farmer}
        </p>

        <button
          className="mt-4 w-full border border-green-700 text-green-700
                     py-2 rounded-lg hover:bg-green-50 transition"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
