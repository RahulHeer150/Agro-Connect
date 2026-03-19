const express = require("express");
const router = express.Router();

const {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} = require("../controllers/cart.controller");

const { authUser, authorizeRoles } = require("../middlewares/auth.middleware");


/**
 * =========================
 * CART ROUTES (BUYER ONLY)
 * =========================
 */

router.post(
  "/add",
  authUser,
  authorizeRoles("buyer"),
  addToCart
);

router.get(
  "/",
  authUser,
  authorizeRoles("buyer"),
  getCart
);

router.put(
  "/update",
  authUser,
  authorizeRoles("buyer"),
  updateCartItem
);

router.delete(
  "/remove/:productId",
  authUser,
  authorizeRoles("buyer"),
  removeFromCart
);

router.delete(
  "/clear",
  authUser,
  authorizeRoles("buyer"),
  clearCart
);

module.exports = router;
