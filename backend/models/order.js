const mongoose = require("mongoose");

const orderschema = new mongoose.Schema({

    name:{type:String, required:true},
    food:{type:String, required:true},
    quantity:{type:Number, required:true,min:1},
    price:{type:Number, required:true},
    //login kora user ID 
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
    status: {
    type: String,
    enum: ["Placed", "Preparing", "Out for Delivery", "Delivered"],
    default: "Placed"
}
});

module.exports = mongoose.model("order",orderschema);