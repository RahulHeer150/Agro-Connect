const User = require("../models/usermodel");

exports.findNearbyFarmers = async (lng, lat, maxDistance) => {
 return await User.find({
  role: "farmer",
  location: { $exists: true },
  "location.coordinates.0": { $exists: true },
  "location.coordinates.1": { $exists: true },
  location: {
    $near: {
      $geometry: {
        type: "Point",
        coordinates: [lng, lat],
      },
      $maxDistance: maxDistance,
    },
  },
}).select("-password");
};