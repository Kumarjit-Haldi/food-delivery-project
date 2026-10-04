const express = require("express");
const router = express.Router();

const Review = require("../models/review");
const authmiddleware = require("../middleware/authmiddleware");

// ADD REVIEW
router.post("/", authmiddleware, async (req, res) => {
  try {
    const { food, rating, review } = req.body;

    const newReview = new Review({
      user: req.user.id,
      food,
      rating,
      review
    });

    await newReview.save();

    res.status(201).json({
      message: "Review added successfully",
      review: newReview
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Failed to add review"
    });
  }
});

// GET REVIEWS FOR A FOOD
router.get("/:foodId", async (req, res) => {
  try {
    const reviews = await Review.find({
      food: req.params.foodId
    })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.json(reviews);

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Failed to fetch reviews"
    });
  }
});

module.exports = router;