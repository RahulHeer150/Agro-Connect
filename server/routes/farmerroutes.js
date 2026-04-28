const express=require("express");
const router=express.Router();
const { authUser, authorizeRoles } = require("../middlewares/authmiddleware");

const { getFarmerdashboard, getFarmerWithProducts }=require("../controllers/farmercontroller");

router.get("/:id", getFarmerWithProducts);

router.get(
    "/dashboard",
    authUser,
    authorizeRoles("farmer"),
    getFarmerdashboard
)


module.exports=router;