import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllProducts,
  deleteProduct,
  updateProductApproval,
} from "../services/productService";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchterm] = useState("");

  const navigate = useNavigate();

  const fileterdProducts = products.filter(
    (product) =>
      product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.farmer?.name?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleDeleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure to want to delete your product",
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct(id);

      fetchProducts();

      alert("product deleted Successfully!!!");
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();

      setProducts(data.products);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  console.log(products);

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleApproval=async(id,status)=>{
    try {
      await updateProductApproval(id,status);

      fetchProducts();
      
    } catch (error) {
      console.error(error)
      
    }

  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Product Management</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search Buyer by name or email"
          value={searchTerm}
          onChange={(e) => setSearchterm(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-green-700 text-white">
            <tr>
              <th className="p-4 text-left">Image</th>
              <th className="p-4 text-left">Product</th>
              <th className="p-4 text-left">Farmer</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Quantity</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
              <th className="p-4 text-left">Approval</th>
            </tr>
          </thead>

          <tbody>
            {fileterdProducts.map((product) => {
              const image = product.images?.[0];

              const imagePath = image?.url || image;

              const imageUrl = imagePath
                ? imagePath.startsWith("http")
                  ? imagePath
                  : `http://localhost:5000${imagePath}`
                : "/placeholder.png";

              return (
                <tr key={product._id}>
                  <td>
                    <img
                      src={imageUrl}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>

                  <td>{product.name}</td>

                  <td>{product.farmer?.name}</td>

                  <td>{product.category}</td>

                  <td>₹{product.price}</td>

                  <td>{product.quantity}</td>

                  <td>{product.status}</td>

                  <td>
                    <button
                      onClick={() => navigate(`/admin/products/${product._id}`)}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      View
                    </button>{" "}
                    <button
                      onClick={() => handleApproval(product._id, "approved")}
                      className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleApproval(product._id, "rejected")}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        product.approvalStatus === "approved"
                          ? "bg-green-100 text-green-700"
                          : product.approvalStatus === "rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {product.approvalStatus}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Product;
