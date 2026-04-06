import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ProfileProgress from "./ProfileProgress";
import { calculateProfileCompletion } from "../utils/profileCompletion";
import LocationPicker from "../components/Map/LocationPicker";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [geoLocation, setGeoLocation] = useState(null);
  const [showMap, setShowMap] = useState(false);

  const navigate = useNavigate();
  const completion = calculateProfileCompletion(user);

  // 🔹 Fetch Profile
  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/auth/profile",
        { withCredentials: true }
      );
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

  // 📍 Save Location to Backend
  const handleSaveLocation = async () => {
    try {
      await axios.put(
        "http://localhost:5000/api/auth/update-profile",
        {
          lat: geoLocation.lat,
          lng: geoLocation.lng,
        },
        { withCredentials: true }
      );

      alert("Location saved successfully ✅");
      setGeoLocation(null);
      fetchProfile();
    } catch (error) {
      console.error(error);
      alert("Failed to save location ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-black to-gray-900 text-white p-6">
      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto mt-20 bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-6"
      >
        {/* HEADER */}
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

        <div className="border-t border-gray-700 my-6"></div>

        {/* FARMER SECTION */}
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

            {/* 📍 MAP BUTTON */}
            <div className="mt-4">
              <button
                onClick={() => setShowMap(true)}
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg shadow-md"
              >
                📍 Select Farm Location on Map
              </button>

              {/* Selected Location */}
              {geoLocation && (
                <p className="text-green-400 mt-2">
                  Selected Location ✅ ({geoLocation.lat.toFixed(3)},{" "}
                  {geoLocation.lng.toFixed(3)})
                </p>
              )}

              {/* Existing Location */}
              {user.location && (
                <p className="text-blue-400 mt-2">
                  Existing Location Saved 🌍
                </p>
              )}
            </div>
          </motion.div>
        )}

        {/* BUYER SECTION */}
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

        {/* BUTTONS */}
        <div className="mt-8 flex justify-between">
          {/* SAVE LOCATION */}
          {geoLocation && user.role === "farmer" && (
            <button
              onClick={handleSaveLocation}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-xl font-semibold"
            >
              Save Location 📍
            </button>
          )}

          {/* EDIT PROFILE */}
          <motion.button
            onClick={() => navigate("/edit-profile")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-gradient-to-r from-green-500 to-green-700 px-6 py-2 rounded-xl font-semibold shadow-lg"
          >
            Enhance Profile ✨
          </motion.button>
        </div>
      </motion.div>

      {/* 🗺️ MAP MODAL */}
      {showMap && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-xl w-[90%] max-w-2xl">
            <h2 className="text-black font-bold mb-3">
              Select Farm Location
            </h2>

            <LocationPicker
              onSelect={(pos) => {
                setGeoLocation({
                  lat: pos.lat,
                  lng: pos.lng,
                });
                setShowMap(false);
              }}
            />

            <button
              onClick={() => setShowMap(false)}
              className="mt-3 text-red-500"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;