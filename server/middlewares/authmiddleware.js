const jwt = require("jsonwebtoken");
const User = require("../models/usermodel");
const BlackListToken = require("../models/blackTokenmodel");

/**
 * ==================================
 * AUTHENTICATE USER (Farmer/Buyer/Admin)
 * ==================================
 */
module.exports.authUser = async (req, res, next) => {
  try {
    // 1️⃣ Get token from cookie OR Authorization header
    const authHeader = req.headers.authorization;
    const token = req.cookies?.token ||
      (authHeader && authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : undefined);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Token missing",
      });
    }

    // 2️⃣ Check if token is blacklisted (logout case)
    const isBlacklisted = await BlackListToken.findOne({ token });
    if (isBlacklisted) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Token revoked",
      });
    }

    // 3️⃣ Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded?.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid token payload",
      });
    }

    // 4️⃣ Get user from DB
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User not found",
      });
    }

    // 5️⃣ Attach user to request
    req.user = user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid or expired token",
    });
  }
};

module.exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    const userRole = req.user?.role?.toString().toLowerCase();
    const normalizedRoles = roles.map((role) => role.toString().toLowerCase());

    if (!req.user || !normalizedRoles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        message: "Access denied: Insufficient permissions",
      });
    }
    next();
  };
};
