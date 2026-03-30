const User = require("../models/usermodel");
const BlackListToken = require("../models/blackTokenmodel");
const axios = require("axios");
const jwt = require("jsonwebtoken");

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
      }
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

    // 🌍 IMPORTANT: Add location ONLY for farmers
    if (role === "farmer") {
      if (!lat || !lng) {
        return res.status(400).json({
          success: false,
          message: "Location (lat, lng) is required for farmers",
        });
      }

      userData.location = {
        type: "Point",
        coordinates: [parseFloat(lng), parseFloat(lat)], // ⚠️ [lng, lat]
      };
    }

    // 🔹 Create user
    const user = await User.create(userData);

    // 🔑 Generate token
    const token = user.generateAuthToken();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user,
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
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
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

exports.updateProfile=async(req,res)=>{
  try{
    const user = await User.findById(req.user._id);

    if(user.role==='farmer'){
      user.farmDetails={
        ...user.farmDetails,
        farmName:req.body.farmName,
        location:{
          state:req.body.state,
          district:req.body.district,
          village:req.body.village,
        },
        farmSize:req.body.farmSize,
      }
    }
    
    if(user.role ==="buyer"){
      user.buyerDetails={
        businessName:req.body.businessName,
        address:req.body.address,
      }
    };
    await user.save();

    res.json({
      success:true,
      message:"Profile Updated Successfully."
    });

  }catch(error){
    res.status(500).json({success:false})
  }
}

/**
 * =====================================
 * LOGOUT USER
 * (Blacklist JWT)
 * =====================================
 */
exports.logout = async (req, res) => {
  try {
    const token =
      req.cookies?.token || req.headers.authorization?.split(" ")[1];

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
