import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Loader from "../../components/Loader";
import { getProductById , deleteProduct } from "../services/productService";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, []);

 

  const fetchProduct = async () => {
    try {
      const data = await getProductById(id);

      setProduct(data.product);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader size="large" />;
  }

  if (!product) {
    return (
      <div className="text-center text-red-500">
        Product not found
      </div>
    );
  }

  const image = product.images?.[0];

  const imagePath = image?.url || image;

  const imageUrl = imagePath
    ? imagePath.startsWith("http")
      ? imagePath
      : `https://agro-connect-8yjz.onrender.com${imagePath}`
    : "/placeholder.png";

  return (
    <div className="space-y-8">

      {/* Product Info */}
      <div className="bg-white rounded-xl shadow p-6">

        <div className="grid md:grid-cols-2 gap-8">

          <div>
            <img
              src={imageUrl}
              alt={product.name}
              className="w-full h-80 object-cover rounded-xl"
            />
          </div>

          <div>

            <h1 className="text-3xl font-bold">
              {product.name}
            </h1>

            <p className="text-green-700 text-2xl font-bold mt-3">
              ₹{product.price} / {product.unit}
            </p>

            <p className="mt-4 text-gray-600">
              {product.description}
            </p>

            <div className="mt-6 space-y-2">

              <p>
                <strong>Category:</strong>{" "}
                {product.category}
              </p>

              <p>
                <strong>Quantity:</strong>{" "}
                {product.quantity}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`px-2 py-1 rounded text-white ${
                    product.status === "available"
                      ? "bg-green-600"
                      : "bg-red-500"
                  }`}
                >
                  {product.status}
                </span>
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Farmer Info */}
      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-2xl font-semibold mb-5">
          Farmer Information
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <p>
            <strong>Name:</strong>{" "}
            {product.farmer?.name}
          </p>

          <p>
            <strong>Email:</strong>{" "}
            {product.farmer?.email}
          </p>

          <p>
            <strong>Phone:</strong>{" "}
            {product.farmer?.phone}
          </p>

          <p>
            <strong>Farm:</strong>{" "}
            {product.farmer?.farmDetails?.farmName ||
              "N/A"}
          </p>

        </div>

      </div>

      {/* Location */}
      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-2xl font-semibold mb-5">
          Product Location
        </h2>

        <div className="grid md:grid-cols-3 gap-4">

          <p>
            <strong>Village:</strong>{" "}
            {product.location?.village || "N/A"}
          </p>

          <p>
            <strong>District:</strong>{" "}
            {product.location?.district || "N/A"}
          </p>

          <p>
            <strong>State:</strong>{" "}
            {product.location?.state || "N/A"}
          </p>

        </div>

      </div>

    </div>
  );
};

export default ProductDetails;