import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductDetails = () => {
  const { addToCart } = useCart();
  const { id } = useParams();

  // Dummy data for now
  const product = {
    name: "Fresh Tomatoes",
    price: 40,
    farmer: "Ramesh Kumar",
    location: "Pune",
    description: "Freshly harvested tomatoes directly from local farms.",
  };

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Image */}
        <div className="h-80 bg-gray-100 rounded-xl" />

        {/* Info */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-green-700 text-xl font-semibold mb-4">
            ₹{product.price} / kg
          </p>

          <p className="text-gray-600 mb-4">{product.description}</p>

          <div className="mb-6 text-sm text-gray-700">
            <p>
              <strong>Farmer:</strong> {product.farmer}
            </p>
            <p>
              <strong>Location:</strong> {product.location}
            </p>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="bg-green-700 text-white px-6 py-3 rounded-lg"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
