const express = require("express");
const router = express.Router();

const food = require("../models/food");


// create food
router.post('/', async(req,res)=>{
  const foodi = await food.create(req.body);

  res.json(foodi);
});


// get all foods
router.get('/', async(req,res)=>{
  const foodi = await food.find();

  res.json(foodi);
});


// get single food
router.get('/:id', async(req,res)=>{
  const foodi = await food.findById(req.params.id);

  res.json(foodi);
});


// update food
router.put('/:id', async(req,res)=>{
  const foodi = await food.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new:true}
  );

  res.json(foodi);
});


// delete food
router.delete('/:id', async(req,res)=>{
  await food.findByIdAndDelete(req.params.id);

  res.json({message:"food deleted successfully"});
});


module.exports = router;