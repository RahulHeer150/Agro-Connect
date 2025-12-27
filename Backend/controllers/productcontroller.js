const Product = require("../models/Product.model");

/**
 * =========================
 * CREATE PRODUCT (Farmer)
 * =========================
 */
exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      description,
      price,
      quantity,
      unit,
      location,
      images,
    } = req.body;

    if (!name || !category || !price || !quantity) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
      });
    }

    const product = await Product.create({
      name,
      category,
      description,
      price,
      quantity,
      unit,
      location,
      images,
      farmer: req.user._id, // 🔗 link product to farmer
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Product creation failed",
      error: error.message,
    });
  }
};

/**
 * =========================
 * GET ALL PRODUCTS (Buyer)
 * =========================
 */
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ status: "available" })
      .populate("farmer", "name phone")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};

/**
 * =========================
 * GET FARMER PRODUCTS
 * =========================
 */
exports.getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({ farmer: req.user._id });

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch your products",
    });
  }
};

/**
 * =========================
 * UPDATE PRODUCT
 * =========================
 */
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // 🔐 Ownership check
    if (product.farmer.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to update this product",
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Product update failed",
    });
  }
};

/**
 * =========================
 * DELETE PRODUCT
 * =========================
 */
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // 🔐 Ownership check
    if (product.farmer.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to delete this product",
      });
    }

    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Product deletion failed",
    });
  }
};
