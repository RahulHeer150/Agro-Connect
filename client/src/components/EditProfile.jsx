import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const EditProfile = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({});

  // Fetch user
  const fetchProfile = async () => {
    const res = await axios.get("http://localhost:5000/api/auth/profile", {
      withCredentials: true,
    });

    setUser(res.data.user);

    // Pre-fill form
    setFormData({
      ...res.data.user.farmDetails,
      ...res.data.user.buyerDetails,
    });
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        "http://localhost:5000/api/user/update-profile",
        formData,
        { withCredentials: true }
      );

      alert("Profile Updated ✅");
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) return <div className="text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto bg-white/10 p-6 rounded-xl"
      >
        <h1 className="text-2xl font-bold mb-6">Edit Profile ✨</h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Farmer Form */}
          {user.role === "farmer" && (
            <>
              <input
                name="farmName"
                placeholder="Farm Name"
                value={formData.farmName || ""}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 rounded"
              />

              <input
                name="state"
                placeholder="State"
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 rounded"
              />

              <input
                name="district"
                placeholder="District"
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 rounded"
              />

              <input
                name="village"
                placeholder="Village"
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 rounded"
              />

              <input
                name="farmSize"
                placeholder="Farm Size"
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 rounded"
              />
            </>
          )}

          {/* Buyer Form */}
          {user.role === "buyer" && (
            <>
              <input
                name="businessName"
                placeholder="Business Name"
                value={formData.businessName || ""}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 rounded"
              />

              <input
                name="address"
                placeholder="Delivery Address"
                value={formData.address || ""}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 rounded"
              />
            </>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-green-600 px-6 py-2 rounded"
          >
            Save Changes 🚀
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default EditProfile;
