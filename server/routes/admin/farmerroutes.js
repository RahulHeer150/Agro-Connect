const express= require("express")

const router= express.Router();

const { getAllFarmers } = require('../../controllers/admin/farmerManagementController');

router.get("/",getAllFarmers)

module.exports=router;