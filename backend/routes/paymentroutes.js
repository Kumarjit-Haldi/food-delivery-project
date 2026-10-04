const express = require("express");
const router = express.Router();

const Razorpay = require("razorpay");
const authmiddleware = require("../middleware/authmiddleware");
const Payment = require("../models/payment");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// ==========================
// CREATE RAZORPAY ORDER
// ==========================

router.post("/create-order", authmiddleware, async (req, res) => {
  try {
    const { food, amount } = req.body;

    if (!food || !amount || amount <= 0) {
      return res.status(400).json({
        message: "Food and valid amount are required"
      });
    }

    const options = {
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: `receipt_${Date.now()}`
    };

    const razorpayorder = await razorpay.orders.create(options);

    // Save payment in MongoDB
    const payment = await Payment.create({
      user: req.user.id,
      food: food,
      amount: amount,
      currency: "INR",
      razorpayorderId: razorpayorder.id,
      status: "created"
    });

    res.json({
      message: "Razorpay order created successfully",
      order: razorpayorder,
      payment: payment,
      key_id: process.env.RAZORPAY_KEY_ID
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to create Razorpay order"
    });
  }
});
// ==========================
// VERIFY RAZORPAY PAYMENT
// ==========================

const crypto = require("crypto");

router.post("/verify-payment", authmiddleware, async (req, res) => {
  try {

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = req.body;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return res.status(400).json({
        message: "Payment verification data missing"
      });
    }

    const body =
      razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET
      )
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        message: "Invalid payment signature"
      });
    }

    const payment = await Payment.findOne({
      razorpayorderId: razorpay_order_id,
      user: req.user.id
    });

    if (!payment) {
      return res.status(404).json({
        message: "Payment record not found"
      });
    }

    payment.razorpaypaymentId = razorpay_payment_id;
    payment.status = "paid";

    await payment.save();

    res.json({
      message: "Payment verified successfully",
      payment: payment
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Payment verification failed"
    });
  }
});

module.exports = router;

