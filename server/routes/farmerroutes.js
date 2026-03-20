const express=require("express");
const router=express.Router();

const { getFarmerdashboard}=require("../controllers/farmercontroller");
const { authUser, authorizeRoles }=require("../middlewares/authmiddleware");

router.get(
    "/dashboard",
    authUser,
    authorizeRoles("farmer"),
    getFarmerdashboard
)


module.exports=router;