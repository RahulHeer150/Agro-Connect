const User = require("../../models/usermodel");

exports.getAllFarmers = async (req, res) => {
  try {
    const farmers = await User.find({
      role: "farmer",
    }).select("-password");

    res.status(200).json({
      success: true,
      count: farmers.length,
      farmers,
    });
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
