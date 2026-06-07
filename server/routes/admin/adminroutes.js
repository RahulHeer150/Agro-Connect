const express = require("express");
const router = express.Router();

// const {authUser}= require('../middlewares/authmiddleware')

// const adminMiddleware=require("../middlewares/admin.middleware");
const {
  getDashBoardStats,
  getFarmerById,
  toggleFarmerStatus,
  deleteFarmer,
  getBuyerById,
  toggleBuyerStatus,
  deleteBuyer,
  getAllBuyers,
  getAllProducts,
  getProductById
} = require("../../controllers/admin.controller");

//FARMER MANAGEMENT  ROUTES FOR FARMERS
router.get("/stats", getDashBoardStats);
router.get("/farmers/:id", getFarmerById);
router.put("/farmers/:id/toggle-status", toggleFarmerStatus);
router.delete("/farmers/:id", deleteFarmer);

// BUYER MANAGEMENT ROUTES FOR BUYERS

router.get("/buyers",getAllBuyers)
router.get("/buyers/:id", getBuyerById);
router.put("/buyers/:id/toggle-status", toggleFarmerStatus);
router.delete("/buyers/:id", deleteFarmer);

//PRODUCT ROUTES

router.get("/products",getAllProducts)
router.get("/products/:id", getProductById);

module.exports = router;
