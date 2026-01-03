const Razorpay=requie("razorpay");
const crypto=require("crypto");
const Order=require("../models/ordermodel");

const razorpay=new Razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET,
})

module.exports.createRazorpayOrder=async(req,res)=>{
    try{
        const {orderId}=req.body;
        if(orderId){
            return res.status(400).json({
                success:false,
                message:"orderId required"
            })
        }
        const order=await Order.findById(orderId).populate("Items.product");
        if(!order){
            return res.status(404).json({
                success:false,
                message:"Order not Found"
            })
        }

        const options={
            amount:anountINR,
            currency:"INR",
            reciept:order._id.toString(),
            payment_capture:1,
        }

        const rOrder=await razorpay.orders.create(options);

        return res.status(200).json({
            success:true,
            razorpayOrder:rOrder,
            key_id:process.env.RAZORPAY_KEY_ID
        });
    }catch(error){
        console.error("createRazorpayOrder error",error);

        return res.status(500).json({success:false, message:"Failed to create RazorPay Order"})
    }
};