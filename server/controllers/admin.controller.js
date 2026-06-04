const User = require("../models/usermodel");
const Product = require("../models/productmodel");
const Order = require("../models/ordermodel");
const productmodel = require("../models/productmodel");

exports.getDashBoardStats = async (req, res) => {
  try {
    const farmers = await User.countDocuments({
      role: "farmer",
    });

    const buyers = await User.countDocuments({
      role: "buyer",
    });

    const products = await Product.countDocuments();

    const orders = await Order.countDocuments();

    res.status(200).json({
      success: true,
      stats: {
        farmers,
        buyers,
        products,
        orders,
      },
    });
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      success: false,
      message: "server Error",
    });
  }
};

exports.getFarmerById = async (req, res) => {
  try {
    const farmer = await User.findById(req.params.id);

    console.log(req.params.id);

    if (!farmer) {
      return res.status(404).json({
        success: false,
        message: "Farmer Not found!!!",
      });
    }

    const products = await Product.find({
      farmer: req.params.id,
    });

    res.status(200).json({
      success: true,
      farmer,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "server Error!!!!",
    });
  }
};

exports.toggleFarmerStatus = async (req, res) => {
  try {
    const farmer = await User.findById(req.params.id);
    if (!farmer) {
      return res.status(404).json({
        success: false,
        message: "Farmer Not Found",
      });
    }
    farmer.isBlocked = !farmer.isBlocked;

    await farmer.save();

    res.status(200).json({
      success: true,
      message: farmer.isBlocked
        ? "farmer suspended successfully"
        : "farmer activated successfully",
      farmer,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "Server Eror",
    });
  }
};

exports.deleteFarmer = async (req, res) => {
  try {
    const farmer = await User.findById(req.params.id);
    if (!farmer) {
      res.status(404).json({
        success: false,
        message: "Farmer not found!!!",
      });
    }

    const products = Product.findById(req.params.id);

    await Product.deleteMany({
      farmer: req.params.id,
    });

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Farmer deleted successfully",
    });
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      success: false,
      message: "server eror!",
    });
  }
};

// BUYER MANAGEMENT

exports.getAllBuyers = async (req, res) => {
  try {
    const buyers = await User.find({
      role: "buyer",
    }).select("-password");

    res.status(200).json({
      success: true,
      count: buyers.length,
      buyers,
    });
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

exports.getBuyerById = async (req, res) => {
  try {
    const buyers = req.params.id;

    if (!buyer) {
      res.status(404).json({
        success: false,
        message: "Buyer not Found!!",
      });
    }

    const orders = await Order.findById({
      buyer: req.params.id,
    });

    res.status(200).json({
      success: true,
      buyer,
      orders,
    });
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      success: false,
      message: "Internal Server Error!!!",
    });
  }
};

exports.toggleBuyerStatus = async (req, res) => {
  try {
    const buyers = req.params.id;

    if (!buyer) {
      res.status(404).json({
        success: false,
        message: "Buyer not Found!!!",
      });
    }
    buyer.isBlocked = !buyer.isBlocked;

    await buyer.save();

    res.status(200).json({
      success: true,
      message: buyer.isBlocked
        ? "Buyer suspended Successfuly"
        : "buyer activated successfully.!!!",
      buyer,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "Server Eror",
    });
  }
};
exports.deleteBuyer = async (req, res) => {
  try {
    const buyer = req.params.id;

    if (!buyer) {
      res.status(404).json({
        success: false,
        message: "Buyer not found!!",
      });
    }
    await Order.deleteMany({
      buyer: req.params.id,
    });
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Buyer Deleted Successfully...",
    });
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      success: false,
      message: "Internal server Error!!",
    });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("farmer", "name email");

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      success: false,
      message: "Internal Server Error!!!",
    });
  }
};


