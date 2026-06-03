const User = require("../models/usermodel");
const Product = require("../models/productmodel");
const Order = require("../models/ordermodel");
const productmodel = require("../models/productmodel");

exports.getDashBoardStats = async (req, res) => {
  try {
    const farmers = await User.countDocuments({
      role: "farmer",
    });

    const buyers = await User.countDocuments({
      role: "buyer",
    });

    const products = await Product.countDocuments();

    const orders = await Order.countDocuments();

    res.status(200).json({
      success: true,
      stats: {
        farmers,
        buyers,
        products,
        orders,
      },
    });
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      success: false,
      message: "server Error",
    });
  }
};

exports.getFarmerById = async (req, res) => {
  try {
    const farmer = await User.findById(req.params.id);

    console.log(req.params.id);

    if (!farmer) {
      return res.status(404).json({
        success: false,
        message: "Farmer Not found!!!",
      });
    }

    const products = await Product.find({
      farmer: req.params.id,
    });

    console.log;

    res.status(200).json({
      success: true,
      farmer,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "server Error!!!!",
    });
  }
};

exports.toggleFarmerStatus = async (req, res) => {
  try {
    const farmer = await User.findById(req.params.id);
    if (!farmer) {
      return res.status(404).json({
        success: false,
        message: "Farmer Not Found",
      });
    }
    farmer.isBlocked = !farmer.isBlocked;

    await farmer.save();

    res.status(200).json({
      success: true,
      message: farmer.isBlocked
        ? "farmer suspended successfully"
        : "farmer activated successfully",
      farmer,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "Server Eror",
    });
  }
};

exports.deleteFarmer=async(req,res)=>{
    try {
        const farmer =await User.findById(req.params.id);
        if(!farmer){
            res.status(404).json({
                success:false,
                message:"Farmer not found!!!"
            })
        }

        const products= Product.findById(req.params.id);

        await Product.deleteMany({
            farmer:req.params.id,
        })
        
        await User.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success:true,
            message:"Farmer deleted successfully",
        })
    } catch (error) {
        console.error(error.message);

        res.status(500).json({
            success:false,
            message:"server eror!"
        })
        
    }


}
