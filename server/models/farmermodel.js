const mongoose = require("mongoose");
 
const farmerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
     location: {
        type: String,
        enum:["Point"],
        required: true,
        default: "Point",
    },
    coordinates: {  
        type: [Number],
        required: true,
    },

     },
     products:[
        {name: String, price: Number,}
     ]
);