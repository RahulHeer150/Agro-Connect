const Product = require("../models/productmodel");
const cloudinary = require("cloudinary").v2;

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
    } = req.body;

    console.log("BODY:", req.body);
console.log("FILES:", req.files);

    if (!name || !category || !price || !quantity) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
      });
    }

    // ✅ Cloudinary URLs
    const imageUrls = (req.files || []).map((file) => ({
  url: file.secure_url,      // ✅ use this
  public_id: file.public_id, // ✅ use this
}));

    const product = await Product.create({
      name,
      category,
      description,
      price: Number(price),
      quantity: Number(quantity),
      unit,
      location: {
        village: location || "",
      },
      images: imageUrls,
      farmer: req.user._id,
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

    // 🔥 If new images uploaded → delete old ones
    if (req.files && req.files.length > 0) {
      for (let img of product.images) {
        if (img.public_id) {
          await cloudinary.uploader.destroy(img.public_id);
        }
      }

      const newImages = req.files.map((file) => ({
  url: file.secure_url,
  public_id: file.public_id,
}));

      req.body.images = newImages;
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
      error: error.message,
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

    // 🔥 Delete images from Cloudinary
    for (let img of product.images) {
      if (img.public_id) {
        await cloudinary.uploader.destroy(img.public_id);
      }
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
      error: error.message,
    });
  }
};

/**
 * =========================
 * GET SINGLE PRODUCT
 * =========================
 */
exports.getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("farmer", "name phone");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};


// const Product = require("../models/productmodel");

// /**
//  * =========================
//  * CREATE PRODUCT (Farmer)
//  * =========================
//  */
// exports.createProduct = async (req, res) => {
//   try {
//     const {
//       name,
//       category,
//       description,
//       price,
//       quantity,
//       unit,
//       location,
//     } = req.body;

//     if (!name || !category || !price || !quantity) {
//       return res.status(400).json({
//         success: false,
//         message: "Required fields are missing",
//       });
//     }

//     // Map uploaded files to stored URLs/paths
//     const imageUrls = (req.files || []).map((file) => {
//       // For local static serving, set as /uploads/<filename>
//       return `/uploads/${file.filename}`;
//     });

//     const product = await Product.create({
//       name,
//       category,
//       description,
//       price: Number(price),
//       quantity: Number(quantity),
//       unit,
//       location: {
//         village: location || "",
//       },
//       images: imageUrls,
//       farmer: req.user._id, // 🔗 link product to farmer
//     });

//     res.status(201).json({
//       success: true,
//       message: "Product created successfully",
//       product,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Product creation failed",
//       error: error.message,
//     });
//   }
// };

// /**
//  * =========================
//  * GET ALL PRODUCTS (Buyer)
//  * =========================
//  */
// exports.getAllProducts = async (req, res) => {
//   try {
//     const products = await Product.find({ status: "available" })
//       .populate("farmer", "name phone")
//       .sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       count: products.length,
//       products,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch products",
//     });
//   }
// };

// /**
//  * =========================
//  * GET FARMER PRODUCTS
//  * =========================
//  */
// exports.getMyProducts = async (req, res) => {
//   try {
//     const products = await Product.find({ farmer: req.user._id });

//     res.status(200).json({
//       success: true,
//       products,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch your products",
//     });
//   }
// };

// /**
//  * =========================
//  * UPDATE PRODUCT
//  * =========================
//  */
// exports.updateProduct = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);

//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: "Product not found",
//       });
//     }

//     // 🔐 Ownership check
//     if (product.farmer.toString() !== req.user._id.toString()) {
//       return res.status(403).json({
//         success: false,
//         message: "You are not allowed to update this product",
//       });
//     }

//     const updatedProduct = await Product.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );

//     res.status(200).json({
//       success: true,
//       message: "Product updated successfully",
//       product: updatedProduct,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Product update failed",
//     });
//   }
// };

// /**
//  * =========================
//  * DELETE PRODUCT
//  * =========================
//  */
// exports.deleteProduct = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);

//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: "Product not found",
//       });
//     }

//     // 🔐 Ownership check
//     if (product.farmer.toString() !== req.user._id.toString()) {
//       return res.status(403).json({
//         success: false,
//         message: "You are not allowed to delete this product",
//       });
//     }

//     await product.deleteOne();

//     res.status(200).json({
//       success: true,
//       message: "Product deleted successfully",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Product deletion failed",
//     });
//   }
// };

// // GET SINGLE PRODUCT BY ID
// exports.getSingleProduct = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id)
//       .populate("farmer", "name phone"); // optional but recommended

//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: "Product not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       product,
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Server Error",
//       error: error.message,
//     });
//   }
// };
