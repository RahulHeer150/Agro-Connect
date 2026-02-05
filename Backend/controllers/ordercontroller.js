const Cart = require("../models/cartmodel");
const Order = require("../models/ordermodel");
const Product = require("../models/productmodel");

module.exports.placeOrder = async (req, res) => {
  try {
    // 1️⃣ Get buyer cart
    const cart = await Cart.findOne({ buyer: req.user._id }).populate(
      "items.product",
    );
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }
    let totalAmount = 0;
    const orderItems = [];

    // 2️⃣ Validate products & calculate total
    for (const item of cart.items) {
      const product = item.product;
      if (product.quantity < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Not enough quantity for ${product.name}`,
        });
      }
      totalAmount += product.price * item.quantity;

      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price,
      });
    }

    // 3️⃣ Create order
    const order = await Order.create({
      buyer: req.user._id,
      items: orderItems,
      totalAmount,
    });

    // 4️⃣ Reduce product stock

    for (const item of cart.items) {
      await Product.findByIdAndUpdate(item.product._id, {
        $inc: { quantity: -item.quantity },
      });
    }

    // 5️⃣ Clear cart
    await Cart.findByIdAndUpdate({ buyer: req.user._id });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to place Order",
      error: error.message,
    });
  }
};

module.exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.user._id })
      .populate("item.product", "name price")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
};

exports.getBuyerOrders = async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.user._id })
      .populate("items.product", "name price unit")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("items.product", "name price unit")
      .populate("buyer", "name email phone");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // 🔐 Buyer ownership check
    if (order.buyer._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to view this order",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch order details",
    });
  }
};

module.exports.getFarmerOrders = async (req, res) => {
  try {
    const farmerId = req.user._id;

    //find product owned by farmer

    const product = await Product.find({ farmer: farmerId }).select("_id");

    // find orders that contains the farmers products.

    const orders = await Order.find({
      "items.product": { $in: productIds },
      paymentStatus: "paid",
    })
      .populate("buyer", "name phone")
      .populate("items.product", "name price unit")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch Farmer Orders.",
      error: error.message,
    });
  }
};
