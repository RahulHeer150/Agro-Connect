const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4">
      
      <img
        src={`http://localhost:5000${product.images?.[0]}`}
        alt={product.name}
        className="w-full h-40 object-cover rounded-lg"
      />

      <h3 className="mt-3 text-lg font-semibold">{product.name}</h3>

      <p className="text-gray-500 text-sm">{product.category}</p>

      <div className="flex justify-between items-center mt-2">
        <span className="text-green-600 font-bold">
          ₹{product.price}
        </span>
        <button className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm">
          Buy
        </button>
      </div>
    </div>
  );
};

export default ProductCard;