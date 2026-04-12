const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../middlewares/upload.middleware");

const {
  createProduct,
  getAllProducts,
  getMyProducts,
  updateProduct,
  deleteProduct,
  getSingleProduct,
} = require("../controllers/productcontroller");

const { authUser, authorizeRoles } = require("../middlewares/authmiddleware");

// ✅ Specific routes FIRST (before /:id)

// Farmer creates product
router.post(
  "/add",
  authUser,
  uploadMiddleware.array("images", 10),
  authorizeRoles("farmer"),
  createProduct
);

// All available products (public)
router.get("/", getAllProducts);

// ✅ /my MUST come before /:id — otherwise Express treats "my" as an id
router.get(
  "/my",
  authUser,
  authorizeRoles("farmer"),
  getMyProducts
);

// ✅ Dynamic routes LAST
router.get("/:id", getSingleProduct);

router.put(
  "/:id",
  authUser,
  authorizeRoles("farmer"),
  updateProduct
);

router.delete(
  "/:id",
  authUser,
  authorizeRoles("farmer"),
  deleteProduct
);

module.exports = router;