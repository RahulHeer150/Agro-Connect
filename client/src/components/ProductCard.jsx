import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition">
      <div className="h-40 bg-gray-100 rounded-t-xl" />

      <div className="p-4">
        <h3 className="font-semibold text-lg">{product.name}</h3>

        <p className="text-green-700 font-medium">₹{product.price} / kg</p>

        <p className="text-sm text-gray-600">{product.farmer}</p>

        <button
          onClick={() => navigate(`/product/1`)}
          className="mt-4 w-full border border-green-700 text-green-700 py-2 rounded-lg"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
