const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    // Crop / Product basic info
    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: ["grain", "vegetable", "fruit", "other"],
      required: true,
    },

    description: {
      type: String,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    unit: {
      type: String,
      enum: ["kg", "quintal", "ton"],
      default: "kg",
    },

    // 🔗 Farmer who owns this product
    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Location (important for buyers)
    location: {
      state: String,
      district: String,
      village: String,
    },

    // Images (Cloudinary URLs)
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        public_id: {
          type: String,
          required: true,
        },
      },
    ],

    status: {
      type: String,
      enum: ["available", "sold_out"],
      default: "available",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
