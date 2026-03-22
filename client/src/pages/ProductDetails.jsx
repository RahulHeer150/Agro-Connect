import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";
import axios from "axios";

const ProductDetails = () => {
  const { addToCart } = useCart();
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/products/${id}`
      );
      setProduct(res.data.product);
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p className="p-6">Loading...</p>;

  const imageUrl = product.images?.[0]?.startsWith("http")
    ? product.images[0]
    : `http://localhost:5000${product.images?.[0]}`;

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <div className="grid md:grid-cols-2 gap-10">

        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-80 object-cover rounded-xl"
        />

        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <p className="text-green-700 text-xl font-semibold mt-2">
            ₹{product.price} / {product.unit}
          </p>

          <p className="text-gray-600 mt-4">
            {product.description}
          </p>

          <div className="mt-4 text-sm text-gray-700">
            <p><strong>Farmer:</strong> {product.farmer?.name}</p>
            <p><strong>Location:</strong> {product.location?.village}</p>
          </div>

          <button
            onClick={() => addToCart(product._id, 1)}
            className="mt-6 bg-green-700 text-white px-6 py-3 rounded-lg"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;