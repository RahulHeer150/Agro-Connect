const User = require("../models/usermodel");

exports.findNearbyFarmers = async (lng, lat, maxDistance) => {
  return await User.find({
    role: "farmer", // 🔥 IMPORTANT
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [lng, lat], // [lng, lat]
        },
        $maxDistance: maxDistance,
      },
    },
  }).select("-password"); // hide password
};