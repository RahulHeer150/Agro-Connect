const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../middlewares/upload.middleware");

const {
  createProduct,
  getAllProducts,
  getMyProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/productcontroller");

const { authUser, authorizeRoles } = require("../middlewares/authmiddleware");

// Product zRoutes

// Farmer creates product
router.post(
  "/add",
  authUser,
  uploadMiddleware.array("images", 10), // accept up to 10 image files
  authorizeRoles("farmer"),
  createProduct
);

// Buyer & public can view products
router.get("/", getAllProducts);

// Farmer views own products
router.get(
  "/my",
  authUser,
  authorizeRoles("farmer"),
  getMyProducts
);

// Farmer updates product
router.put(
  "/:id",
  authUser,
  authorizeRoles("farmer"),
  updateProduct
);

// Farmer deletes product
router.delete(
  "/:id",
  authUser,
  authorizeRoles("farmer"),
  deleteProduct
);

module.exports = router;
