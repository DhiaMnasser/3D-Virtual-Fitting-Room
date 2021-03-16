const express = require('express')
const router = express.Router()
const Avatar = require('../models/avatar')
//Getting all
router.get('/', async(req,res)=>{
try{
const avatars = await Avatar.find()
res.json(avatars)
}catch (err){
res.status(500).json({message:err.message})

}
})
//getting one
router.get('/:id',getAvatar, (req,res)=>{
  res.send(res.avatar)  
})
//creating one
router.post('/', async(req,res)=>{
    const avatar = new Avatar({
        avatarFile:req.body.avatarFile,
        userId:req.body.userId

    })
try{
    const newAvatar = await avatar.save()
    res.status(201).json(newAvatar)
}catch(err){
res.status(400).json({message:err.message})
}
})
//updating one
router.patch('/:id',getAvatar,async(req,res)=>{
   if(req.body.avatarFile != null){
       res.avatar.avatarFile = req.body.avatarFile

   } 
   if(req.body.userId != null){
       res.avatar.userId = req.body.userId
   }
   
  
   try{

    const updatedAvatar = await res.avatar.save()
    res.json(updatedAvatar)
   }catch(err){

    res.status(400).json({message:err.message})
   }
})
//deleting one
router.delete('/:id',getAvatar,async (req,res)=>{
    try{
await res.avatar.remove()
res.json({message:'deleted avatar'})
    }catch(err){
res.status(500).json({message:err.message})
    }
})
async function getAvatar(req,res,next){
    try{
avatar = await Avatar.findById(req.params.id)
if(avatar == null){
    return res.status(404).json({message:'cannot find Avatar'})
}
    }catch(err){
return res.status(500).json({message:err.message})
    }
   
   res.avatar = avatar 
   next()
}

module.exports= router;