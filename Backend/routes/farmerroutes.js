const express=require("express");
const router=express.Router();

const { getFarmerDashboard}=require("../controllers/farmercontroller");
const { authUser, authorizeRoles }=require("../middlewares/authmiddleware");

router.get(
    "/dashboard",
    authUser,
    authorizeRoles("farmer"),
    getFarmerDashboard
)

module.exports=router;