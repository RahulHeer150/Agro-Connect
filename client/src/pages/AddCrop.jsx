import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const AddCrop = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    quantity: "",
    unit: "",
    location: "",
  });

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Handle inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle image upload
  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  // Submit using AXIOS
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const data = new FormData();

      // Append text fields
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      // Append images
      for (let i = 0; i < images.length; i++) {
        data.append("images", images[i]);
      }

      const response = await axios.post(
        "http://localhost:5000/api/products/add",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
  
  
     if (response.data.success) {
        alert("✅ Crop added successfully");

        // Reset form
        setFormData({
          name: "",
          category: "",
          description: "",
          price: "",
          quantity: "",
          unit: "",
          location: "",
        });
        setImages([]);
      }
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message || "❌ Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl bg-gray-800 p-8 rounded-2xl shadow-xl"
      >
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Add Crop 🌾
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Crop Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-green-500"
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-green-500"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-green-500"
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              className="p-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-green-500"
              required
            />

            <input
              type="text"
              name="quantity"
              placeholder="Quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="p-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="unit"
              placeholder="Unit (kg, ton)"
              value={formData.unit}
              onChange={handleChange}
              className="p-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-green-500"
              required
            />

            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              className="p-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="w-full text-gray-300 bg-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-green-500"
          />

          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition"
          >
            {loading ? "Adding..." : "Add Crop"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddCrop;