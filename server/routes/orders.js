const express = require('express')
const router = express.Router()
const Order = require('../models/order')
//Getting all
router.get('/', async(req,res)=>{
try{
const orders = await Order.find()
res.json(orders)
}catch (err){
res.status(500).json({message:err.message})

}
})
//getting one
router.get('/:id',getOrder, (req,res)=>{
  res.send(res.order)  
})
//creating one
router.post('/', async(req,res)=>{
    const order = new Order({
        clientId:req.body.clientId,
        dateCreated:req.body.dateCreated,
        dateShipped:req.body.dateShipped,
        isValid: req.body.isValid,
        isShipped:req.body.isShipped,
        totalPrice:req.body.totalPrice
       


    })
try{
    const newOrder = await order.save()
    res.status(201).json(newOrder)
}catch(err){
res.status(400).json({message:err.message})
}
})
//updating one
router.patch('/:id',getOrder,async(req,res)=>{
   if(req.body.clientId != null){
       res.order.clientId = req.body.clientId

   } 
   if(req.body.dateCreated != null){
       res.order.dateCreated = req.body.dateCreated
   }
   if (req.body.dateShipped != null){
       res.order.dateShipped = req.body.dateShipped
   }
   if(req.body.isValid != null){
       res.order.isValid = req.body.isValid
   }
    if(req.body.isShipped!= null){
       res.order.isShipped = req.body.isShipped
   }
    if(req.body.totalPrice != null){
       res.order.totalPrice = req.body.totalPrice
   }
  
   try{

    const updatedOrder = await res.order.save()
    res.json(updatedOrder)
   }catch(err){

    res.status(400).json({message:err.message})
   }
})
//deleting one
router.delete('/:id',getOrder,async (req,res)=>{
    try{
await res.order.remove()
res.json({message:'deleted order'})
    }catch(err){
res.status(500).json({message:err.message})
    }
})
async function getOrder(req,res,next){
    try{
order = await Order.findById(req.params.id)
if(order == null){
    return res.status(404).json({message:'cannot find order'})
}
    }catch(err){
return res.status(500).json({message:err.message})
    }
   res.order = order 
   next()
}

module.exports= router;