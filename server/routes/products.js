const express = require('express')
const router = express.Router()
const Product = require('../models/product')
//Getting all
router.get('/', async(req,res)=>{
try{
const products = await Product.find()
res.json(products)
}catch (err){
res.status(500).json({message:err.message})

}
})
//getting one
router.get('/:id',getProduct, (req,res)=>{
  res.send(res.product)  
})
//creating one
router.post('/', async(req,res)=>{
    const product = new Product({
        productName:req.body.productName,
        description:req.body.description,
        category:req.body.category,
        price: req.body.price,
        size:req.body.size,
        stockQuantity:req.body.stockQuantity,
        image:req.body.image,
        ArModel: req.body.ArModel



    })
try{
    const newProduct = await product.save()
    res.status(201).json(newProduct)
}catch(err){
res.status(400).json({message:err.message})
}
})
//updating one
router.patch('/:id',getProduct,async(req,res)=>{
   if(req.body.productName != null){
       res.product.productName = req.body.productName

   } 
   if(req.body.description != null){
       res.product.description = req.body.description
   }
   if (req.body.category != null){
       res.product.category = req.body.category
   }
   if(req.body.price != null){
       res.product.price = req.body.price
   }
    if(req.body.size!= null){
       res.product.size = req.body.size
   }
    if(req.body.stockQuantity != null){
       res.product.stockQuantity = req.body.stockQuantity
   }
     if(req.body.image != null){
       res.product.image = req.body.image
   }
    if(req.body.ArModel != null){
       res.product.ArModel = req.body.ArModel
   }
   try{

    const updatedProduct = await res.product.save()
    res.json(updatedProduct)
   }catch(err){

    res.status(400).json({message:err.message})
   }
})
//deleting one
router.delete('/:id',getProduct,async (req,res)=>{
    try{
await res.product.remove()
res.json({message:'deleted product'})
    }catch(err){
res.status(500).json({message:err.message})
    }
})
async function getProduct(req,res,next){
    try{
product = await Product.findById(req.params.id)
if(product == null){
    return res.status(404).json({message:'cannot find product'})
}
    }catch(err){
return res.status(500).json({message:err.message})
    }
   res.product = product 
   next()
}

module.exports= router;