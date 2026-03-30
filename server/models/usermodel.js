const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    // 🔹 Basic Info
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      minlength: 6,
      select: false,
    },

    // 🔹 Role System
    role: {
      type: String,
      enum: ["farmer", "buyer", "admin"],
      default: "buyer",
    },

    avatar: String,

    isVerified: {
      type: Boolean,
      default: false,
    },

    // 🌍 GEOJSON LOCATION (FOR MAP FUNCTIONALITY)
    location: {
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
      },
    },

    // 🌾 Farmer Details
    farmDetails: {
      farmName: String,
      location: {
        state: String,
        district: String,
        village: String,
      },
      cropsGrown: [String],
      farmSize: String,
    },

    // 🛒 Buyer Details
    buyerDetails: {
      businessName: String,
      address: String,
    },

    provider: {
      type: String,
      default: "local",
    },

    // 🔐 Password Reset
    resetPasswordToken: {
      type: String,
      default: null,
    },
    resetPasswordExpire: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);


// 🌍 IMPORTANT: 2dsphere INDEX FOR GEO QUERIES
userSchema.index({ location: "2dsphere" });


// 🔐 HASH PASSWORD BEFORE SAVE
userSchema.pre("save", async function () {
  if (!this.isModified("password") || !this.password) return;
  this.password = await bcrypt.hash(this.password, 10);
});


// 🔑 GENERATE JWT TOKEN
userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { id: this._id, role: this.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};


// 🔍 COMPARE PASSWORD
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


module.exports = mongoose.model("User", userSchema);