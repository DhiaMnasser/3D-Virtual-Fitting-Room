const express = require('express')
const router = express.Router()
const Claim = require('../models/claim')
//Getting all
router.get('/', async(req,res)=>{
try{
const claims = await Claim.find()
res.json(claims)
}catch (err){
res.status(500).json({message:err.message})

}
})
//getting one
router.get('/:id',getClaim, (req,res)=>{
  res.send(res.claim)  
})
//creating one
router.post('/', async(req,res)=>{
    const claim = new Claim({
        message:req.body.message,
        userId:req.body.userId

    })
try{
    const newClaim = await claim.save()
    res.status(201).json(newClaim)
}catch(err){
res.status(400).json({message:err.message})
}
})
//updating one
router.patch('/:id',getClaim,async(req,res)=>{
   if(req.body.message != null){
       res.claim.message = req.body.message

   } 
   if(req.body.userId != null){
       res.claim.userId = req.body.userId
   }
   
  
   try{

    const updatedClaim = await res.claim.save()
    res.json(updatedClaim)
   }catch(err){

    res.status(400).json({message:err.message})
   }
})
//deleting one
router.delete('/:id',getClaim,async (req,res)=>{
    try{
await res.claim.remove()
res.json({message:'deleted claim'})
    }catch(err){
res.status(500).json({message:err.message})
    }
})
async function getClaim(req,res,next){
    try{
claim = await Claim.findById(req.params.id)
if(claim == null){
    return res.status(404).json({message:'cannot find Claim'})
}
    }catch(err){
return res.status(500).json({message:err.message})
    }
   res.claim = claim 
   next()
}

module.exports= router;