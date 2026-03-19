const express = require("express");
const router = express.Router();

const {
  placeOrder,
  getMyOrders,
   getBuyerOrders,
  getOrderById,
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



// Buyer order history
router.get(
  "/my",
  authUser,
  authorizeRoles("buyer"),
  getBuyerOrders
);

// Buyer single order tracking
router.get(
  "/:id",
  authUser,
  authorizeRoles("buyer"),
  getOrderById
);

module.exports = router;
