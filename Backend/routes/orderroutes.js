const express = require("express");
const router = express.Router();

const {
  placeOrder,
  getMyOrders,
} = require("../controllers/ordercontroller");

const { authUser, authorizeRoles } = require("../middlewares/authmiddleware");

/**
 * =========================
 * ORDER ROUTES (BUYER)
 * =========================
 */

router.post(
  "/place",
  authUser,
  authorizeRoles("buyer"),
  placeOrder
);

router.get(
  "/my",
  authUser,
  authorizeRoles("buyer"),
  getMyOrders
);

module.exports = router;
