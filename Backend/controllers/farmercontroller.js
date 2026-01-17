const Product = require("../models/productmodel");
const Order = require("../models/ordermodel");

// Farmer DashBoard

module.exports.getFarmerdashboard = async (req, res) => {
  try {
    const farmerId = req.user._id;

    //product Stats

    const totalProducts = await Product.countDocuments({
      farmer: farmerId,
    });

    const activeProduct = await Product.countDocuments({
      farmer: farmerId,
      status: "available",
    });

    //order containing the farmer products

    const orders = await Order.find({
      "items.product": {
        $in: await Product.find({ farmer: farmerId }).distinct("_id"),
      },
      paymentStatus: "paid",
    });

    //Calculate revenue

    let totalRevenue = 0;
    orders.forEach((order) => {
      order.items.forEach((item) => {
        totalRevenue += item.price * item.quantity;
      });
    });

    const recentOrders = orders
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, 5);

    res.status(200).json({
      success: true,
      dashboard: {
        totalProducts,
        activeProduct,
        totalOrders: orders.length,
        totalRevenue,
        recentOrders,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to Load the Farmer Dashboard Analytics.",
      error: error.message,
    });
  }
  
};
