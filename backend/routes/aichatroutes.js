const express = require("express");
const router = express.Router();

const Food = require("../models/food");
const authmiddleware = require("../middleware/authmiddleware");
router.post("/", authmiddleware,  async (req, res) => {
  try {
    const { message } = req.body;

    const foods = await Food.find();

    const foodlist = foods
      .map((x) => {
        return `${x.name} - ₹${x.price}`;
      })
      .join("\n");

    const { default: Groq } = await import("groq-sdk");

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY
    });

    const completion = await groq.chat.completions.create({
      model:
        process.env.GROQ_MODEL || "llama-3.1-8b-instant",

      messages: [
        {
          role: "system",
          content: `
You are FoodNest AI, an AI food recommendation assistant.

Your job:
1. Recommend suitable food.
2. Help the user find foods.
3. Suggest food based on the user's request.
4. Answer food-related and food-order-related questions.
5. Recommend ONLY foods that are available in the FoodNest menu below.
6. Be friendly, concise and helpful.

Available FoodNest menu:
${foodlist}
          `
        },
        {
          role: "user",
          content: message
        }
      ]
    });

    const reply =
      completion.choices[0]?.message?.content ||
      "Sorry, I could not generate a recommendation.";

    res.json({
      reply: reply
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "AI response failed"
    });
  }
});

module.exports = router;