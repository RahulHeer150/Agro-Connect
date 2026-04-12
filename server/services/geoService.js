const User = require("../models/usermodel");

exports.findNearbyFarmers = async (lng, lat, maxDistance) => {
  return await User.aggregate([
    // Step 1: find nearby farmers
    {
      $geoNear: {
        near: { type: "Point", coordinates: [lng, lat] },
        distanceField: "distanceInMeters",
        maxDistance: maxDistance,
        spherical: true,
        query: { role: "farmer", location: { $exists: true } },
      },
    },

    // Step 2: join their products from products collection
    {
      $lookup: {
        from: "products",           // MongoDB collection name
        localField: "_id",          // farmer _id
        foreignField: "farmer",     // product.farmer field
        as: "products",
        pipeline: [
          { $match: { status: "available" } }, // only available products
          { $project: { name: 1, price: 1, category: 1, unit: 1 } },
        ],
      },
    },

    // Step 3: convert meters to km and add product count
    {
      $addFields: {
        distance: { $divide: ["$distanceInMeters", 1000] },
        productCount: { $size: "$products" },
      },
    },

    // Step 4: hide sensitive fields
    {
      $project: {
        password: 0,
        distanceInMeters: 0,
        resetPasswordToken: 0,
        resetPasswordExpire: 0,
      },
    },
  ]);
};