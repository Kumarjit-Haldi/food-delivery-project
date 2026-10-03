
const express = require("express");
const router = express.Router();

const order = require("../models/order");
const authmiddleware = require("../middleware/authmiddleware");
const adminmiddleware = require("../middleware/adminmiddleware");


//create  order
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

//get all orders
router.get('/',authmiddleware,adminmiddleware, async(req,res)=>{
  const orderi= await order.find();
    res.json(orderi);
});
//nijer order dekhar jonno
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

//get single order
router.get('/:id', authmiddleware, adminmiddleware,async(req,res)=>{
  const orderi= await order.findById(req.params.id);
    res.json(orderi);
});

//updateorder
router.put('/:id', authmiddleware, adminmiddleware,async(req,res)=>{
  const orderi= await order.findByIdAndUpdate(req.params.id, req.body, {new:true});
    res.json(orderi);
});

router.delete('/:id',authmiddleware, adminmiddleware, async(req,res)=>{
  await order.findByIdAndDelete(req.params.id);
    res.json({message:"order deleted successfully"});
});

module.exports = router;
