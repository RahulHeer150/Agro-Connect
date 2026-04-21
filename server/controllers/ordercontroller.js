const Cart = require("../models/cartmodel");
const Order = require("../models/ordermodel");
const Product = require("../models/productmodel");
const { notifyFarmerNewOrder, 
    notifyBuyerOrderStatus,
    notifyBuyerShipped
 } = require("../services/notificationservice");

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

    let farmerId = null; // To track the farmer for notification

    // 2️⃣ Validate products & calculate total
    for (const item of cart.items) {
      const product = item.product;

      if (!product) {
        return res.status(400).json({
          success: false,
          message: "One of the cart items is no longer available",
        });
      }

      if (product.status !== "available") {
        return res.status(400).json({
          success: false,
          message: `Product ${product.name} is not available`,
        });
      }

      if (product.quantity < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Not enough quantity for ${product.name}`,
        });
      }

      // 👉 Assign farmer (first product)
      if (!farmerId) {
        farmerId = product.farmer;
      }

      // ❗ Ensure all products belong to same farmer
      if (farmerId.toString() !== product.farmer.toString()) {
        return res.status(400).json({
          success: false,
          message: "All products must belong to same farmer",
        });
      }

      totalAmount += product.price * item.quantity;

      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price,
      });
    }

    const { address, city, phone, paymentMethod } = req.body;

    if (!address || !city || !phone || !paymentMethod) {
      return res.status(400).json({
        success: false,
        message: "Address, city, phone and payment method are required",
      });
    }

    // 3️⃣ Create order
    const order = await Order.create({
      buyer: req.user._id,
      farmer: farmerId,
      items: orderItems,
      totalAmount,
      shippingAddress: {
        addressLine: address,
        district: city,
      },
      paymentMethod,
      paymentStatus: paymentMethod === "COD" ? "paid" : "pending",
      status: "PLACED",
    });

    await order.populate([
      { path: "buyer", select: "name email" },
      { path: "farmer", select: "name email" },
      { path: "items.product", select: "name" },
    ]);

    const populatedOrder = order;

    // 4️⃣ Notify farmer about new order
    notifyFarmerNewOrder(populatedOrder);

     // ✅ Clear cart
    // Clear cart after order placement
    await Cart.findOneAndDelete({ buyer: req.user._id });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error("Order placement failed:", error);
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
      .populate("items.product", "name price images unit")
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
      .populate("items.product", "name price unit images")
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
      .populate("items.product", "name price unit images")
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

    const products = await Product.find({ farmer: farmerId }).select("_id");
    const productIds = products.map(p => p._id)


    // find orders that contains the farmers products.

    const orders = await Order.find({
      "items.product": { $in: productIds },
      paymentStatus: "paid",
    })
      .populate("buyer", "name phone")
      .populate("items.product", "name price unit images")
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

const updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;

    const order = await Order.findById(orderId).populate("buyer farmer");
    if (!order) {
      return res.status(404).json({ 
        success: false,
        message: "Order not found" 
      });
    }
    if(order.farmer._id.toString() !== req.user._id.toString()){
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this order"
      });
    }
    order.status = status;

    await order.save();

    // 🔔 Notifications
    if (status === "READY_TO_SHIP") {
      notifyBuyerReady(order);
    }

    if (status === "SHIPPED") {
      notifyBuyerShipped(order);
    }

    res.status(200).json({
      success: true,
      message: "Order status updated",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false, 
      message: "Failed to update order status",
      error: error.message,
    });
  } 
};

module.exports.updateOrderStatus = updateOrderStatus;


    
  
