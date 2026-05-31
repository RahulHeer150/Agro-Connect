const User= require("../models/usermodel");
const Product=require("../models/productmodel")
const Order= require("../models/ordermodel");

exports.getDashBoardStats=async(req,res)=>{
    try{
        const farmers= await User.countDocuments({
            role:"farmer",
        });

         const buyers= await User.countDocuments({
            role:"buyer",
        });

        const products= await Product.countDocuments();

        const orders= await Order.countDocuments();


        res.status(200).json({
            success:true,
            stats:{
                farmers,
                buyers,
                products,
                orders,
            },
        })

    }catch(error){
        console.error(error.message);

        res.status(500).json({
            success:false,
            message:"server Error",
        })
        
    }
}