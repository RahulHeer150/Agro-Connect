const express=require('express');
const router=express.Router();


const {authUser}= require('../middlewares/authmiddleware')

const adminMiddleware=require("../middlewares/admin.middleware");
const { AuthMechanism } = require('mongodb');


router.get("/test",authUser,adminMiddleware)

module.exports=router;