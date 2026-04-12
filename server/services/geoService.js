const User = require("../models/usermodel");

exports.findNearbyFarmers = async (lng, lat, maxDistance) => {
  return await User.aggregate([
    {
      $geoNear: {
        near: { type: "Point", coordinates: [lng, lat] },
        distanceField: "distanceInMeters",
        maxDistance: maxDistance,
        spherical: true,
        query: { role: "farmer", location: { $exists: true } },
      },
    },
    {
      $addFields: {
        distance: { $divide: ["$distanceInMeters", 1000] },
      },
    },
    {
      $project: { password: 0, distanceInMeters: 0 },
    },
  ]);
};