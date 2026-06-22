const User = require("../models/usermodel");
const BlackListToken = require("../models/blackTokenmodel");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

/**
 * =====================================
 * REGISTER USER
 * (Farmer / Buyer / Admin)
 * =====================================
 */

// 🔵 Google Login
exports.googleLogin = async (req, res) => {
  try {
    const { token } = req.body;

    // Get user info from Google
    const googleRes = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const { name, email } = googleRes.data;

    console.log(`Google OAuth Login: ${name} (${email}) logged in`);

    // Check if user already exists
    let user = await User.findOne({ email });

    if (!user) {
      // create user if not exists
      user = await User.create({
        name,
        email,
        phone: "0000000000", // default phone because your schema requires it
        password: "google-auth", // dummy password

        isVerified: true,
      });

      console.log(`New Google user created: ${email}`);
    }

    // Generate JWT using your existing method
    const jwtToken = user.generateAuthToken();

    res.status(200).json({
      success: true,
      message: "Google login successful",
      token: jwtToken,
      user,
    });
  } catch (error) {
    console.error("Google OAuth Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Google authentication failed",
    });
  }
};

exports.register = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      password,
      role,
      lat,
      lng,
      farmDetails,
      buyerDetails,
    } = req.body;

    console.log(req.body);

    // 🔹 Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // 🔹 Prepare user data
    let userData = {
      name,
      email,
      phone,
      password,
      role,
      farmDetails,
      buyerDetails,
    };

    // 🔹 Create user
    const user = await User.create(userData);

    // 🔑 Generate token
    const token = user.generateAuthToken();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
/**
 * =====================================
 * LOGIN USER
 * =====================================
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    // 1️⃣ Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // 2️⃣ Find user (include password)
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // 3️⃣ Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // 4️⃣ Generate JWT using model method
    const token = user.generateAuthToken();

    // 5️⃣ Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // MUST be true for HTTPS (Vercel + Render)
      sameSite: "None", // MUST be None for cross-origin
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message,
    });
  }
};

/**
 * =====================================
 * GET LOGGED-IN USER PROFILE
 * (Requires auth middleware)
 * =====================================
 */
exports.getProfile = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch profile",
    });
  }
};

// exports.updateProfile = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { lat, lng } = req.body;

//     const user = await User.findById(userId);

//     // 🔥 Save GeoJSON location
//     if (lat && lng) {
//       user.location = {
//         type: "Point",
//         coordinates: [lng, lat],
//       };

//       // 🌍 Reverse Geocoding
//       const geoRes = await axios.get(
//         "https://nominatim.openstreetmap.org/reverse",
//         {
//           params: {
//             lat,
//             lon: lng,
//             format: "json",
//           },
//         }
//       );

//       const address = geoRes.data.address;

//       user.farmDetails.location = {
//         state: address.state || "",
//         district: address.county || "",
//         village:
//           address.village ||
//           address.town ||
//           address.city ||
//           "",
//       };
//     }

//     await user.save();

//     res.status(200).json({
//       success: true,
//       user,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Update failed",
//     });
//   }
// };

exports.updateProfile = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User not authenticated",
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const {
      lat,
      lng,
      address,
      farmName,
      farmSize,
      businessName,
      state,
      district,
      village,
    } = req.body;

    if (lat && lng) {
      user.location = {
        type: "Point",
        coordinates: [lng, lat],
      };
    }

    if (farmName !== undefined) {
      user.farmDetails = user.farmDetails || {};
      user.farmDetails.farmName = farmName;
    }

    if (farmSize !== undefined) {
      user.farmDetails = user.farmDetails || {};
      user.farmDetails.farmSize = farmSize;
    }

    if (state !== undefined || district !== undefined || village !== undefined) {
      user.farmDetails = user.farmDetails || {};
      user.farmDetails.location = {
        state:
          state !== undefined
            ? state
            : user.farmDetails.location?.state || "",
        district:
          district !== undefined
            ? district
            : user.farmDetails.location?.district || "",
        village:
          village !== undefined
            ? village
            : user.farmDetails.location?.village || "",
      };
    }

    if (businessName !== undefined) {
      user.buyerDetails = user.buyerDetails || {};
      user.buyerDetails.businessName = businessName;
    }

    if (address && typeof address === "string") {
      user.buyerDetails = user.buyerDetails || {};
      user.buyerDetails.address = address;
    }

    await user.save();

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Update failed",
    });
  }
};
/**
 * =====================================
 * LOGOUT USER
 * (Blacklist JWT)
 * =====================================
 */
exports.logout = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token =
      req.cookies?.token ||
      (authHeader && authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : undefined);

    if (token) {
      await BlackListToken.create({ token });
    }

    res.clearCookie("token");

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Logout failed",
    });
  }
};

// const User = require("../models/usermodel");
// const crypto = require("crypto");
// const nodemailer = require("nodemailer");

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase().trim(),
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found with this email",
      });
    }

    // Generate reset token
    const resetToken = crypto
      .randomBytes(32)
      .toString("hex");

    // Store hashed token in DB
    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordExpire =
      Date.now() + 10 * 60 * 1000; // 10 min

    await user.save();

    // Frontend Reset URL
    const resetURL =
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    const transporter =
      nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

    const message = `
      <h2>Password Reset Request</h2>

      <p>
        Click the button below to reset your password.
      </p>

      <a
        href="${resetURL}"
        style="
          background:#16a34a;
          color:white;
          padding:12px 20px;
          text-decoration:none;
          border-radius:8px;
          display:inline-block;
        "
      >
        Reset Password
      </a>

      <p>
        This link will expire in 10 minutes.
      </p>

      <p>
        If you didn't request this,
        please ignore this email.
      </p>
    `;

    await transporter.sendMail({
      from: `"AgroConnect Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Reset Your AgroConnect Password",
      html: message,
    }).catch(err => {
      console.error("Email send error (non-critical):", err.message);
      // Don't fail the request if email fails
    });

    return res.status(200).json({
      success: true,
      message:
        "Password reset link sent successfully",
    });

  } catch (error) {
    console.error("Forgot password error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


exports.resetPassword = async (req, res) => {
  try {

    const { token } = req.params;
    const { newPassword } = req.body;

    if (!newPassword) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    // Hash incoming token
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,

      resetPasswordExpire: {
        $gt: Date.now(),
      },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid or expired reset token",
      });
    }

    // Update Password
    user.password = newPassword;

    // Clear reset fields
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return res.status(200).json({
      success: true,
      message:
        "Password reset successful",
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};