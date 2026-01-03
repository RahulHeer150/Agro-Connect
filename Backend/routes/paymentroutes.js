const express = require("express");
const router = express.Router();
const { createRazorpayOrder, verifyRazorpayPayment } = require("../controllers/paymentcontroller");
const { authUser, authorizeRoles } = require("../middlewares/authmiddleware");

router.post("/razorpay/create", authUser, authorizeRoles("buyer"), createRazorpayOrder);
router.post("/razorpay/verify", authUser, authorizeRoles("buyer"), verifyRazorpayPayment);

module.exports = router;
