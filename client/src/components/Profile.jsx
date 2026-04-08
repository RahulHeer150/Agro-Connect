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

        <h2 className="text-2xl font-bold mb-4 text-green-400">
          🌾 Farm Location
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          {/* LEFT SIDE */}
          <div>
            <p className="text-gray-300">
              {user.farmDetails?.location?.village},{" "}
              {user.farmDetails?.location?.district},{" "}
              {user.farmDetails?.location?.state}
            </p>

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

          {/* RIGHT SIDE (MINI MAP) */}
          <div>
            {user.location ? (
              <div className="h-[250px] w-full rounded-xl overflow-hidden border border-gray-700">
                <MiniMap
                  lat={user.location.coordinates[1]}
                  lng={user.location.coordinates[0]}
                />
              </div>
            ) : (
              <div className="h-[250px] flex items-center justify-center border border-gray-700 rounded-xl text-gray-400">
                No location selected 🌍
              </div>
            )}
          </div>

        </div>
      </div>

      {/* MAP MODAL */}
      {showMap && (
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