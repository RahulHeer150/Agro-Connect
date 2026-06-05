import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getAllProducts } from "../services/productService";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchterm] = useState("");

  const fileterdProducts = products.filter(
    (product) =>
      product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.farmer?.name?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

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

                  <td>View | Delete</td>
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
