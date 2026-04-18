import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import { motion } from "framer-motion";
import { Trash2, Edit2, Plus, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";
import Loader from "./Loader";

const MyProduct = () => {
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 📍 Fetch farmer's products
  useEffect(() => {
    console.log("🔍 Auth Check:", { isLoggedIn, role: user?.role });
    
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    if (user?.role !== "farmer") {
      setError("Only farmers can access this page");
      return;
    }

    fetchMyProducts();
  }, [isLoggedIn, user, navigate]);

  const fetchMyProducts = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await api.get("/api/products/my");
      setProducts(res.data?.products || []);
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Failed to fetch your products";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // 🗑️ Delete product
  const handleDeleteProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      await api.delete(`/api/products/${productId}`);
      setProducts(products.filter((p) => p._id !== productId));
      toast.success("Product deleted successfully");
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Failed to delete product";
      toast.error(errorMsg);
    }
  };

  // ✏️ Edit product
  const handleEditProduct = (productId) => {
    navigate(`/edit-product/${productId}`);
  };

  // ➕ Add new product
  const handleAddProduct = () => {
    navigate("/add-crop");
  };

  // 🖼️ Get image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) {
      return "https://via.placeholder.com/300x200?text=No+Image";
    }
    if (imagePath.startsWith("http")) {
      return imagePath;
    }
    return `http://localhost:5000${imagePath}`;
  };

  // ⏳ Loading state
  if (loading) {
    return <Loader />;
  }

  // 📵 No authentication
  if (!isLoggedIn || user?.role !== "farmer") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-8 text-center max-w-md"
        >
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Access Denied
          </h2>
          <p className="text-gray-600 mb-6">
            Only farmers can view their products.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Go to Login
          </button>
        </motion.div>
      </div>
    );
  }

  // 🎨 Main Component
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-6 md:p-10 mt-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              My Products
            </h1>
            <p className="text-gray-600">
              Manage your crops and products here
            </p>
          </div>
          <button
            onClick={handleAddProduct}
            className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300 font-semibold"
          >
            <Plus size={20} />
            Add New Product
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded"
          >
            <p className="font-semibold">Error</p>
            <p>{error}</p>
          </motion.div>
        )}

        {/* Empty State */}
        {products.length === 0 && !error ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-lg p-12 text-center"
          >
            <div className="text-6xl mb-4">🌾</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              No Products Yet
            </h2>
            <p className="text-gray-600 mb-6">
              Start by adding your first crop or product to begin selling!
            </p>
            <button
              onClick={handleAddProduct}
              className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition duration-300 font-semibold inline-flex items-center gap-2"
            >
              <Plus size={20} />
              Add First Product
            </button>
          </motion.div>
        ) : (

          
          /* Products Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
              >
                {/* Product Image */}
                <div className="relative h-48 overflow-hidden bg-gray-200">
                  <img
                    src={getImageUrl(product.images?.[0])}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />

                  {/* Status Badge */}
                  <div className="absolute top-3 right-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
                        product.status === "available"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {product.status === "available" ? "Available" : "Sold Out"}
                    </span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-2">
                    {product.name}
                  </h3>

                  <p className="text-gray-500 text-sm mb-3 capitalize">
                    {product.category}
                  </p>

                  {/* Price & Quantity */}
                  <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                    <div className="bg-green-50 p-2 rounded">
                      <p className="text-gray-600 text-xs">Price</p>
                      <p className="font-bold text-green-600">₹{product.price}</p>
                    </div>
                    <div className="bg-blue-50 p-2 rounded">
                      <p className="text-gray-600 text-xs">Quantity</p>
                      <p className="font-bold text-blue-600">
                        {product.quantity} {product.unit}
                      </p>
                    </div>
                  </div>

                  {/* Location */}
                  {product.location?.village && (
                    <p className="text-gray-600 text-xs mb-4">
                      📍 {product.location.village}
                      {product.location.district &&
                        `, ${product.location.district}`}
                    </p>
                  )}

                  {/* Description */}
                  {product.description && (
                    <p className="text-gray-600 text-xs mb-4 line-clamp-2">
                      {product.description}
                    </p>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditProduct(product._id)}
                      className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold text-sm"
                    >
                      <Edit2 size={16} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition duration-300 font-semibold text-sm"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Stats Section */}
        {products.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10"
          >
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <p className="text-gray-600 text-sm font-semibold mb-2">
                Total Products
              </p>
              <p className="text-4xl font-bold text-green-600">
                {products.length}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <p className="text-gray-600 text-sm font-semibold mb-2">
                Available
              </p>
              <p className="text-4xl font-bold text-blue-600">
                {products.filter((p) => p.status === "available").length}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <p className="text-gray-600 text-sm font-semibold mb-2">
                Total Stock Value
              </p>
              <p className="text-4xl font-bold text-orange-600">
                ₹
                {products
                  .reduce((sum, p) => sum + p.price * p.quantity, 0)
                  .toLocaleString("en-IN")}
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default MyProduct;