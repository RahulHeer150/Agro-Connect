const mongoose = require("mongoose");

const farmerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    // 🌍 GEOJSON LOCATION
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
        default: "Point",
      },
      coordinates: {
        type: [Number], // [lng, lat]
        required: true,
      },
    },

    // Optional fields (for future use)
    products: [
      {
        name: String,
        price: Number,
      },
    ],
  },
  { timestamps: true }
);

// 🔥 2dsphere index (VERY IMPORTANT)
farmerSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Farmer", farmerSchema);