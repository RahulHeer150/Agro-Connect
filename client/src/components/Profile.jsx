import React, { useEffect, useState } from "react";
import axios from "axios";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ProfileProgress from "./ProfileProgress";
import { calculateProfileCompletion } from "../utils/profileCompletion";


const Profile = () => {


  const [user, setUser] = useState(null);
  const navigate=useNavigate();
    const completion= calculateProfileCompletion(user)

  const fetchProfile = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/profile", {
        withCredentials: true,
      });
      setUser(res.data.user);
    } catch (error) {
      console.error("Profile fetch error:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-black to-gray-900 text-white p-6">
      
      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto mt-20 bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-6"
      >
        
        {/* Header */}
        <div className="flex items-center gap-6">
          <img
            src={
              user.avatar ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="avatar"
            className="w-24 h-24 rounded-full border-4 border-green-500"
          />

          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-gray-300">{user.email}</p>
            <span className="bg-green-600 px-3 py-1 rounded-full text-sm">
              {user.role.toUpperCase()}
            </span>
          </div>
        </div>

        <ProfileProgress percentage={completion} />

        {/* Divider */}
        <div className="border-t border-gray-700 my-6"></div>

        {/* Role Based Info */}
        {user.role === "farmer" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3"
          >
            <h2 className="text-xl font-semibold text-green-400">
              Farm Details 🌾
            </h2>

            <p>
              <strong>Farm Name:</strong>{" "}
              {user.farmDetails?.farmName || "Not added"}
            </p>

            <p>
              <strong>Location:</strong>{" "}
              {user.farmDetails?.location?.village || "N/A"},{" "}
              {user.farmDetails?.location?.district},{" "}
              {user.farmDetails?.location?.state}
            </p>

            <p>
              <strong>Farm Size:</strong>{" "}
              {user.farmDetails?.farmSize || "Not added"}
            </p>

            <p>
              <strong>Crops:</strong>{" "}
              {user.farmDetails?.cropsGrown?.join(", ") || "Not added"}
            </p>
          </motion.div>
        )}

        {user.role === "buyer" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3"
          >
            <h2 className="text-xl font-semibold text-blue-400">
              Business Details 🏢
            </h2>

            <p>
              <strong>Business Name:</strong>{" "}
              {user.buyerDetails?.businessName || "Not added"}
            </p>

            <p>
              <strong>Address:</strong>{" "}
              {user.buyerDetails?.address || "Not added"}
            </p>
          </motion.div>
        )}

        {/* Button */}
        <div className="mt-8 flex justify-end">
          <motion.button
          onClick={()=>navigate("/edit-profile")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-gradient-to-r from-green-500 to-green-700 px-6 py-2 rounded-xl font-semibold shadow-lg"
          >
            Enhance Profile ✨
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;