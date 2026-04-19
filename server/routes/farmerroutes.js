const express=require("express");
const router=express.Router();

const { getFarmerdashboard}=require("../controllers/farmercontroller");
const { authUser, authorizeRoles }=require("../middlewares/authmiddleware");
const { getFarmerWithProducts } = require("../controllers/farmerController");

router.get("/:id", getFarmerWithProducts);

router.get(
    "/dashboard",
    authUser,
    authorizeRoles("farmer"),
    getFarmerdashboard
)


module.exports=router;