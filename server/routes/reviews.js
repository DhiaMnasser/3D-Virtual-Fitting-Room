const express = require('express')
const router = express.Router()
const Review = require('../models/review')
//const verifyToken = require('./users') 
//Getting all
router.get('/', async(req,res)=>{
try{
const reviews = await Review.find()
res.json(reviews)
}catch (err){
res.status(500).json({message:err.message})

}
})
//getting one
router.get('/:id',getReview, (req,res)=>{
  res.send(res.review)  
})
//creating one
router.post('/', async(req,res)=>{
    const review = new Review({
        message:req.body.message,
        userId:req.body.userId,
        productId:req.body.productId,
        reviewDate:req.body.reviewDate,

    })
try{
    const newReview = await review.save()
    res.status(201).json(newReview)
}catch(err){
res.status(400).json({message:err.message})
}
})
//updating one
router.patch('/:id',getReview,async(req,res)=>{
   if(req.body.message != null){
       res.review.message = req.body.message

   } 
   if(req.body.userId != null){
       res.review.userId = req.body.userId
   }
   if(req.body.productId != null){
       res.review.productId = req.body.productId
   }
   if(req.body.reviewDate != null){
       res.review.reviewDate = req.body.reviewDate
   }
  
   try{

    const updatedReview = await res.review.save()
    res.json(updatedReview)
   }catch(err){

    res.status(400).json({message:err.message})
   }
})
//deleting one
router.delete('/:id',getReview,async (req,res)=>{
    try{
await res.review.remove()
res.json({message:'deleted review'})
    }catch(err){
res.status(500).json({message:err.message})
    }
})
async function getReview(req,res,next){
    try{
review = await Review.findById(req.params.id)
if(review == null){
    return res.status(404).json({message:'cannot find review'})
}
    }catch(err){
return res.status(500).json({message:err.message})
    }
   res.review = review 
   next()
}
//test the function
/* router.post('/test',verifyToken,(req,res)=>{
    jwt.verify(req.token,'secretkey',(err,authData)=>{
        if(err){
            res.status(403).json({message:'err'})
        }else{
          res.json({
        message:'post created',
        authData
    })
        }
    })

}) */
module.exports= router;