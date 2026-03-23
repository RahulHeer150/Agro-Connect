const Cart = require("../models/cartmodel");
const Product = require("../models/productmodel");

//Add to cart

module.exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({
        success: false,
        message: "Product ID and quantity are required",
      });
    }

    const product = await Product.findById(productId);
    if (!product || product.status !== "available") {
      return res.status(404).json({
        success: false,
        message: "Product not available",
      });
    }

    let cart = await Cart.findOne({ buyer: req.user._id });

    if (!cart) {
      cart = await Cart.create({
        buyer: req.user._id,
        items: [{ product: productId, quantity }],
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }
      await cart.save();
    }
    res.status(200).json({
      success: true,
      message: "Product added to cart",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add to cart",
      error: error.message,
    });
  }
};

module.exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ buyer: req.user._id }).populate(
      "items.product",
      "name price unit"
    );
    

    if (!cart) {
      return res.status(200).json({
        success: true,
        cart: { items: [] },
      });
    }

    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch Cart",
    });
  }
};

module.exports.updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cart = await Cart.findOne({ buyer: req.user._id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const item = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found in cart",
      });
    }

    item.quantity = quantity;
    await cart.save();

   await cart.populate("items.product", "name price unit");

res.status(200).json({
  success: true,
  cart,
});

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update cart",
    });
  }
};

module.exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({ buyer: req.user._id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }
    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();

   await cart.populate("items.product", "name price unit");

res.status(200).json({
  success: true,
  cart,
});

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to remove item",
    });
  }
};

module.exports.clearCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ buyer: req.user._id });

    res.status(200).json({
      success: true,
      message: "Cart cleared",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to clear cart",
    });
  }
};
