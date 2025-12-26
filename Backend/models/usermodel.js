const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // ✅ MISSING IMPORT (FIXED)

const userSchema = new mongoose.Schema(
  {
    // =========================
    // COMMON FIELDS
    // =========================
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
      required: true,
      minlength: 6,
      select: false, // 🔐 important
    },

    role: {
      type: String,
      enum: ["farmer", "buyer", "admin"],
      default: "buyer",
    },

    avatar: {
      type: String,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    // =========================
    // FARMER SPECIFIC
    // =========================
    farmDetails: {
      farmName: String,
      location: {
        state: String,
        district: String,
        village: String,
      },
      cropsGrown: [String],
      farmSize: {
        type: String, // small | medium | large
      },
    },

    // =========================
    // BUYER SPECIFIC
    // =========================
    buyerDetails: {
      businessName: String,
      address: String,
    },

    // =========================
    // PASSWORD RESET
    // =========================
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

//
// 🔐 HASH PASSWORD BEFORE SAVE
//
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//
// 🔑 GENERATE JWT TOKEN
// (Matches your auth.middleware expectations)
//
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      id: this._id,
      role: this.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  return token;
};

//
// 🔑 COMPARE PASSWORD
//
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
