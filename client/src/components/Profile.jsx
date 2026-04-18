import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ProfileProgress from "./ProfileProgress";
import { calculateProfileCompletion } from "../utils/profileCompletion";
import LocationPicker from "../components/LocationPicker";
import MiniMap from "../components/MiniMap";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [geoLocation, setGeoLocation] = useState(null);
  const [showMap, setShowMap] = useState(false);

  const navigate = useNavigate();
  const completion = calculateProfileCompletion(user);

  const fetchProfile = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/auth/profile",
      { withCredentials: true }
    );
    setUser(res.data.user);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // 🌍 GET ADDRESS FROM LAT/LNG (FRONTEND)
  const getAddressFromCoords = async (lat, lng) => {
    try {
      const res = await axios.get(
        "https://nominatim.openstreetmap.org/reverse",
        {
          params: {
            lat,
            lon: lng,
            format: "json",
          },
          headers: {
            "User-Agent": "AgroConnect/1.0 (rahulheer@email.com)",
          },
        }
      );

      const address = res.data.address;

      return {
        state: address.state || "",
        district: address.county || "",
        village:
          address.village ||
          address.town ||
          address.city ||
          "",
      };
    } catch (error) {
      console.error("Geocoding error:", error);
      return {};
    }
  };

  // 💾 SAVE LOCATION
  const handleSaveLocation = async () => {
    try {
      const address = await getAddressFromCoords(
        geoLocation.lat,
        geoLocation.lng
      );

      await axios.put(
        "http://localhost:5000/api/auth/update-profile",
        {
          lat: geoLocation.lat,
          lng: geoLocation.lng,
          address,
        },
        { withCredentials: true }
      );

      alert("Location saved ✅");
      setGeoLocation(null);
      fetchProfile();
    } catch (error) {
      console.error(error);
    }
  };

  // 📡 GPS LOCATION
  const handleGetCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setGeoLocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
      setShowMap(true);
    });
  };

  // 🌍 OPEN GOOGLE MAP
  const openMap = () => {
    const lat = geoLocation?.lat || user.location.coordinates[1];
    const lng = geoLocation?.lng || user.location.coordinates[0];
    window.open(`https://www.google.com/maps?q=${lat},${lng}`);
  };

  if (!user) return <div className="text-white">Loading...</div>;

 return (
  <div className="min-h-screen bg-gradient-to-br from-green-900 via-black to-gray-900 text-white p-6">

    <div className="max-w-5xl mx-auto mt-10 bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-6">

      {/* 🔥 HEADER */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={user.avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
          className="w-16 h-16 rounded-full border-2 border-green-500"
        />
        <div>
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-gray-400">{user.email}</p>
        </div>
      </div>

      {/* 📊 PROFILE COMPLETION (FOR ALL) */}
      <ProfileProgress percentage={completion} />

      <div className="mt-6">

        {/* ========================= */}
        {/* 👨‍🌾 FARMER VIEW */}
        {/* ========================= */}
        {user.role === "farmer" && (
          <div className="grid md:grid-cols-2 gap-6">

            {/* LEFT SIDE INFO */}
            <div>
              <h3 className="text-xl text-green-400 mb-3">Farm Details 🌾</h3>

              <p><strong>Farm:</strong> {user.farmDetails?.farmName || "N/A"}</p>

              <p className="mt-2">
                📍 {user.farmDetails?.location?.village},{" "}
                {user.farmDetails?.location?.district},{" "}
                {user.farmDetails?.location?.state}
              </p>

              <p className="mt-2">
                🌾 Crops: {user.farmDetails?.cropsGrown?.join(", ") || "N/A"}
              </p>

              <p className="mt-2">
                📏 Size: {user.farmDetails?.farmSize || "N/A"}
              </p>

              {/* 🔥 LOCATION CONTROLS (ONLY FARMER) */}
              <div className="space-y-3 mt-4">

                <button
                  onClick={handleGetCurrentLocation}
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg w-full"
                >
                  📡 Use Current Location
                </button>

                {!user.location && (
                  <button
                    onClick={() => setShowMap(true)}
                    className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg w-full"
                  >
                    📍 Select on Map
                  </button>
                )}

                {user.location && (
                  <>
                    <button
                      onClick={() => setShowMap(true)}
                      className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-lg w-full"
                    >
                      ✏️ Change Location
                    </button>

                    <button
                      onClick={openMap}
                      className="text-blue-400 underline"
                    >
                      🌍 Open in Google Maps
                    </button>
                  </>
                )}

                {geoLocation && (
                  <button
                    onClick={handleSaveLocation}
                    className="bg-green-600 px-4 py-2 rounded-lg w-full"
                  >
                    {user.location ? "Update Location" : "Save Location"}
                  </button>
                )}
              </div>
            </div>

            {/* RIGHT SIDE MINI MAP */}
            <div>
              <h3 className="text-xl text-green-400 mb-3">Farm Location 🗺️</h3>

              {user.location ? (
                <div className="h-[220px] w-full rounded-xl overflow-hidden border border-gray-700">
                  <MiniMap
                    lat={user.location.coordinates[1]}
                    lng={user.location.coordinates[0]}
                  />
                </div>
              ) : (
                <div className="h-[220px] flex items-center justify-center border border-gray-700 rounded-xl text-gray-400">
                  No location selected 🌍
                </div>
              )}
            </div>

          </div>
        )}

        {/* ========================= */}
        {/* 🛒 BUYER VIEW */}
        {/* ========================= */}
        {user.role === "buyer" && (
          <div>

            <h3 className="text-xl text-blue-400 mb-3">
              Business Details 🏢
            </h3>

            <p>
              <strong>Business Name:</strong>{" "}
              {user.buyerDetails?.businessName || "N/A"}
            </p>

            <p className="mt-2">
              <strong>Address:</strong>{" "}
              {user.buyerDetails?.address || "N/A"}
            </p>

            {/* 🔥 NO MAP, NO LOCATION BUTTONS */}

            <div className="mt-6 text-gray-400">
              📍 Location features are available for farmers only
            </div>

          </div>
        )}

      </div>

      {/* EDIT BUTTON */}
      <div className="mt-6 text-right">
        <button
          onClick={() => navigate("/edit-profile")}
          className="bg-gradient-to-r from-green-500 to-green-700 px-6 py-2 rounded-xl"
        >
          Edit Profile ✨
        </button>
      </div>

    </div>

    {/* MAP MODAL */}
    {showMap && user.role === "farmer" && (
      <LocationPicker
        onSelect={(pos) => {
          setGeoLocation(pos);
          setShowMap(false);
        }}
      />
    )}

  </div>
);
};

export default Profile;