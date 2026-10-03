
const express = require("express");
const router = express.Router();

const order = require("../models/order");


//create  order
router.post('/', async(req,res)=>{
  const orderi= await order.create(req.body);
  
    res.json(orderi);
});


//get all orders
router.get('/', async(req,res)=>{
  const orderi= await order.find();
    res.json(orderi);
});


//get single order
router.get('/:id', async(req,res)=>{
  const orderi= await order.findById(req.params.id);
    res.json(orderi);
});

//updateorder
router.put('/:id', async(req,res)=>{
  const orderi= await order.findByIdAndUpdate(req.params.id, req.body, {new:true});
    res.json(orderi);
});

router.delete('/:id', async(req,res)=>{
  await order.findByIdAndDelete(req.params.id);
    res.json({message:"order deleted successfully"});
});

module.exports = router;
