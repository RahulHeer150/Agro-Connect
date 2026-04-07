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

  const handleSaveLocation = async () => {
    await axios.put(
      "http://localhost:5000/api/auth/update-profile",
      {
        lat: geoLocation.lat,
        lng: geoLocation.lng,
      },
      { withCredentials: true }
    );

    alert("Location saved with address ✅");
    setGeoLocation(null);
    fetchProfile();
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

  const openMap = () => {
    const lat = geoLocation?.lat || user.location.coordinates[1];
    const lng = geoLocation?.lng || user.location.coordinates[0];
    window.open(`https://www.google.com/maps?q=${lat},${lng}`);
  };

  if (!user) return <div className="text-white">Loading...</div>;

  return (
    <div className="p-6 text-white">
      {user.role === "farmer" && (
        <div>
          <h2>Farm Location</h2>

          {/* 🌍 Address */}
          <p>
            {user.farmDetails?.location?.village},{" "}
            {user.farmDetails?.location?.district},{" "}
            {user.farmDetails?.location?.state}
          </p>

          {/* 📍 BUTTONS */}
          <div className="space-y-2 mt-3">
            <button onClick={handleGetCurrentLocation}>
              📡 Use Current Location
            </button>

            {!user.location && (
              <button onClick={() => setShowMap(true)}>
                📍 Select on Map
              </button>
            )}

            {user.location && (
              <>
                <button onClick={() => setShowMap(true)}>
                  ✏️ Change Location
                </button>

                <p onClick={openMap}>
                  🌍 View Location
                </p>

               {user.location && (
  <MiniMap
    lat={user.location.coordinates[1]}
    lng={user.location.coordinates[0]}
  />
)}
              </>
            )}
          </div>

          {/* SAVE */}
          {geoLocation && (
            <button onClick={handleSaveLocation}>
              {user.location ? "Update Location" : "Save Location"}
            </button>
          )}
        </div>
      )}

      {/* 🗺️ MAP MODAL */}
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