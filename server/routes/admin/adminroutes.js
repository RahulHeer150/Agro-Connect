const express=require('express');
const router=express.Router();


// const {authUser}= require('../middlewares/authmiddleware')

// const adminMiddleware=require("../middlewares/admin.middleware");
const {getDashBoardStats,getFarmerById, toggleFarmerStatus,deleteFarmer}= require("../../controllers/admin.controller")


router.get("/stats", getDashBoardStats)
router.get("/farmers/:id",getFarmerById)
router.put("/farmers/:id/toggle-status",toggleFarmerStatus);
router.delete("/farmers/:id",deleteFarmer)
module.exports=router;