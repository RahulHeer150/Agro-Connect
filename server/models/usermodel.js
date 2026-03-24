const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
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
      required: false,
      minlength: 6,
      select: false,
    },

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

    buyerDetails: {
      businessName: String,
      address: String,
    },

    provider: {
    type: String,
    default: "local"
  },

  //required for forgot password using reset link
    resetPasswordToken: {
      type: String,
      default: null,
    },
    resetPasswordExpires: {
      type: Date,
      default: null,
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

// ✅ FIXED PRE-SAVE HOOK
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// Generate JWT
userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { id: this._id, role: this.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// Compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
