const { kmtoMeters } = require('../utils/distanceHelper');
const geoService = require('../services/geoService');

exports.getNearbyFarmers = async (req, res) => {
    try {
        const { lng, lat, distance } = req.query;
        if (!lng || !lat) {
            return res.status(400).json({success:false, message: 'Longitude and latitude are required' });
        }


        const radiusKm= distance ? parseFloat(distance) : 30; // Default to 30 km if distance is not provided

        const maxDistance= kmtoMeters(radiusKm); // Convert distance to meters

        const farmers= await findNearbyFarmers(
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