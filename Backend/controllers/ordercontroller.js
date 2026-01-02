const Cart = require("../models/Cart.model");
const Order = require("../models/Order.model");
const Product = require("../models/Product.model");

module.exports.placeOrder=async(req,res)=>{
    try{
        const cart=await Cart.findOne({buyer:req.user._id}).populate(
            "items.product"
        )
        if(!cart|| cart.items.length===0){
            return res.status(400).json({
                success:false,
                message:"Cart is empty",
            })
        }
        let totalAmount=0;
        const orderItems=[];

        for(const item of cart.items){
            const product=item.product;
            if(product.quantity<item.quantity){
                return res.status(400).json({
                    success:false,
                    message:`Not enough quantity for ${product.name}`,
                })
            }
        }
    }
}