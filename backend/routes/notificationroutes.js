const express = require("express");
const router = express.Router();

const Notification = require("../models/notification");
const authmiddleware = require("../middleware/authmiddleware");

// Get user's notifications
router.get("/", authmiddleware, async (req, res) => {
  try {
    const notifications = await Notification.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(notifications);
  } catch (err) {
    console.error("Failed to fetch notifications:", err);

    res.status(500).json({
      message: "Failed to fetch notifications",
    });
  }
});

// Mark notification as read
router.put("/:id/read", authmiddleware, async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.id,
      },
      {
        isRead: true,
      },
      {
        new: true,
      }
    );

    if (!notification) {
      return res.status(404).json({
        message: "Notification not found",
      });
    }

    res.json(notification);
  } catch (err) {
    console.error("Failed to mark notification as read:", err);

    res.status(500).json({
      message: "Failed to mark notification as read",
    });
  }
});

module.exports = router;