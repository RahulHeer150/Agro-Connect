const express=require('express');
const router=express.Router();


// const {authUser}= require('../middlewares/authmiddleware')

// const adminMiddleware=require("../middlewares/admin.middleware");
const {getDashBoardStats,getFarmerById}= require("../../controllers/admin.controller")


router.get("/stats", getDashBoardStats)
router.get("/farmers/:id",getFarmerById)
module.exports=router;