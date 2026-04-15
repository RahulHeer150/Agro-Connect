const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number, // price at time of order
          required: true,
        },
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
    },

    shippingAddress: {
      state: String,
      district: String,
      village: String,
      addressLine: String,
    },

    paymentId: {
      type: String,
    },

    status: {
      type: String,
      enum: [
        "PLACED",
        "CONFIRMED",
        "READY_TO_SHIP",
        "SHIPPED",
        "DELIVERED",
        "CANCELLED",
      ],
      default: "PLACED",
    },


    paymentStatus: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },

      statusHistory: [
      {
        status: String,
        updatedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    // ⭐ Optional: Prevent duplicate notifications
    notifications: {
      orderPlacedSent: { type: Boolean, default: false },
      readySent: { type: Boolean, default: false },
      shippedSent: { type: Boolean, default: false },
    },


  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
