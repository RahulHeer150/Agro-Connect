import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";
import axios from "axios";
import {useAuth} from "../context/AuthContext";
import Loader from "../components/Loader";

const ProductDetails = () => {
  const { addToCart } = useCart();

  const {user, isLoggedIn} = useAuth();
  const navigate = useNavigate();

  const { id } = useParams();

  const [product, setProduct] = useState(null);

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



  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);

        console.log("API DATA:", res.data);

        setProduct(res.data.product);
      } catch (err) {
        console.error("ERROR:", err);
      }
    };

    fetchProduct();
  }, [id]);

  console.log("ID:", id);

  if (!product) return <Loader size="large"/>;

  const productImage = product.images?.[0];
  const imagePath = productImage?.url || productImage;
  const imageUrl = imagePath?.startsWith("http")
    ? imagePath
    : `http://localhost:5000${imagePath}`;

  return (
    <section className="max-w-6xl mx-auto px-6 py-16 mt-10">
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

          <p className="text-gray-600 mt-4">{product.description}</p>

          <div className="mt-4 text-sm text-gray-700">
            <p
  onClick={() => navigate(`/farmer/${product.farmer._id}`)}
  className="text-green-600 cursor-pointer hover:underline"
>
  {product.farmer.name}
</p>
            <p>
              <strong>Location:</strong> {product.location?.village}
            </p>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.quantity === 0}
            className="mt-6 bg-green-700 text-white px-6 py-3 rounded-lg disabled:opacity-50"
          >
            {product.quantity === 0 ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
