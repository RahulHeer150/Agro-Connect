const { kmToMeters } = require("../utils/distanceHelper");
const { findNearbyFarmers } = require("../services/geoService");

exports.getNearbyFarmers = async (req, res) => {
  try {
    const { lng, lat, distance } = req.query;

    // 🔹 Validation
    if (!lng || !lat) {
      return res.status(400).json({
        success: false,
        message: "Longitude and latitude are required",
      });
    }

    // 🔹 Default = 30 km
    const radiusKm = distance ? parseFloat(distance) : 30;

    // 🔹 Convert to meters
    const maxDistance = kmToMeters(radiusKm);

    // 🔥 Fetch farmers
    const farmers = await findNearbyFarmers(
      parseFloat(lng),
      parseFloat(lat),
      maxDistance
    );

    res.status(200).json({
      success: true,
      count: farmers.length,
      data: farmers,
    });
  } catch (error) {
    console.error("Map Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};