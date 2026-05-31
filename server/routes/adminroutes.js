const express=require('express');
const router=express.Router();


// const {authUser}= require('../middlewares/authmiddleware')

// const adminMiddleware=require("../middlewares/admin.middleware");
const {getDashBoardStats}= require("../controllers/admin.controller")


router.get("/stats", getDashBoardStats)

module.exports=router;