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

const verifyRazorpayPayment=async(req,res)=>{
    try{
        const { razorpay_order_id , razorpay_payment_id , razorpay_signature, orderId } =req.body;

        if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !orderId){
            return res.status(400).json({
                success:false,
                messsage:"Missing Payment Info."
            })
        }

        const generated_signature=crypto
        .createHmac("sha256".process.env.RAZORPAY_KEY_SECRET)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");

        if(generated_signature !== razorpay_signature){
            return res.status(400).json({
                success:false,
                message:"Invaid Signature"
            })
        }

         // Mark order paid in DB
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
     order.payment = {
      method: "razorpay",
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    };
    order.status = "paid";
    await order.save();

    // Optionally clear Cart, notify seller, send email etc.

    return res.status(200).json({ success: true, message: "Payment verified and order completed", order });
  } catch (err) {
    console.error("verifyRazorpayPayment error", err);
    return res.status(500).json({ success: false, message: "Payment verification failed" });
  }
};