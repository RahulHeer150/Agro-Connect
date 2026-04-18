const express = require("express");
const router = express.Router();

const {
  placeOrder,
  getMyOrders,
  getBuyerOrders,
  getOrderById,
  getFarmerOrders,
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

// router.get(
//   "/my",
//   authUser,
//   authorizeRoles("buyer"),
//   getMyOrders
// );



// Buyer order history
router.get(
  "/my",
  authUser,
  authorizeRoles("buyer"),
  getBuyerOrders
);

// 🌾 Farmer's orders (sellers view - orders they received)
router.get(
  "/farmer/my",
  authUser,
  authorizeRoles("farmer"),
  getFarmerOrders
);

// Buyer single order tracking
router.get(
  "/:id",
  authUser,
  authorizeRoles("buyer"),
  getOrderById
);

module.exports = router;
