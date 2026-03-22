const express = require("express");
const router = express.Router();

const {
  register,
  login,
  logout,
  getProfile,
  googleLogin,
  updateProfile
} = require("../controllers/authcontroller");

const { authUser } = require("../middlewares/authmiddleware");
 
//======AuthRoutes =======
// Register (Farmer / Buyer / Admin)
router.post("/register", register);

// Login
router.post("/login", login);

// Get logged-in user profile
router.get("/profile", authUser, getProfile);

// Logout
router.post("/logout", authUser, logout);

router.put("/update-profile",authUser,updateProfile)

// Google Login
router.post("/google-login", googleLogin);

module.exports = router;
