
const express = require("express");
const router = express.Router();

const order = require("../models/order");
const Notification = require("../models/notification");
const authmiddleware = require("../middleware/authmiddleware");
const adminmiddleware = require("../middleware/adminmiddleware");

// create order
router.post("/", authmiddleware, async (req, res) => {
  try {
    const orderi = await order.create({
      ...req.body,
      userId: req.user.id
    });

    res.json(orderi);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Order creation failed"
    });
  }
});

// get all orders
router.get("/", authmiddleware, adminmiddleware, async (req, res) => {
  const orderi = await order.find();
  res.json(orderi);
});

// Demand Prediction data
router.get(
  "/demand-prediction",
  authmiddleware,
  adminmiddleware,
  async (req, res) => {
    try {
      const demand = await order.aggregate([
        {
          $group: {
            _id: "$food",
            totalOrders: { $sum: "$quantity" }
          }
        },
        {
          $sort: {
            totalOrders: -1
          }
        }
      ]);

      res.json(demand);
    } catch (err) {
      console.error(err);

      res.status(500).json({
        message: "Failed to fetch demand prediction data"
      });
    }
  }
);

// nijer order dekhar jonno
router.get("/my-orders", authmiddleware, async (req, res) => {
  try {
    const orders = await order.find({
      userId: req.user.id
    });

    res.json(orders);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to fetch your orders"
    });
  }
});

// get single order
router.get("/:id", authmiddleware, adminmiddleware, async (req, res) => {
  const orderi = await order.findById(req.params.id);
  res.json(orderi);
});

// update order
router.put("/:id", authmiddleware, adminmiddleware, async (req, res) => {
  try {
    const orderi = await order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!orderi) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    // Create notification when order status changes
    if (req.body.status) {
      await Notification.create({
        userId: orderi.userId,
        message: `Your order status has been updated to ${req.body.status}.`
      });
    }

    res.json(orderi);
  } catch (err) {
    console.error("Order update error:", err);

    res.status(500).json({
      message: "Failed to update order"
    });
  }
});

// delete order
router.delete("/:id", authmiddleware, adminmiddleware, async (req, res) => {
  await order.findByIdAndDelete(req.params.id);
  res.json({
    message: "order deleted successfully"
  });
});

module.exports = router;