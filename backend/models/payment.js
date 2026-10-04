const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },

  food: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "food",
    required: true
  },

  amount: {
    type: Number,
    required: true
  },

  currency: {
    type: String,
    default: "INR"
  },

  razorpayorderId: {
    type: String,
    required: true,
    unique: true
  },

  razorpaypaymentId: {
    type: String,
    default: null
  },

  status: {
    type: String,
    enum: ["created", "paid", "failed"],
    default: "created"
  }

}, { timestamps: true });

module.exports = mongoose.model("payment", paymentSchema);