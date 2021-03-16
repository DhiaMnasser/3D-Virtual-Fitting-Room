const express = require('express')
const router = express.Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
//Getting all
router.get('/', async(req,res)=>{
try{
const users = await User.find()
res.json(users)
}catch (err){
res.status(500).json({message:err.message})

}
})
//getting one
router.get('/:id',getUser, (req,res)=>{
  res.send(res.user)  
})
//creating one
router.post('/', async(req,res)=>{
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        password: req.body.password,
        address:req.body.address,
        creditCard:req.body.creditCard,
        image:req.body.image,
        role: req.body.role


    })
try{
    const newUser = await user.save()
    res.status(201).json(newUser)
}catch(err){
res.status(400).json({message:err.message})
}
})
//updating one
router.patch('/:id',getUser,async(req,res)=>{
   if(req.body.name != null){
       res.user.name = req.body.name

   } 
   if(req.body.email != null){
       res.user.email = req.body.email
   }
   if (req.body.phone != null){
       res.user.phone = req.body.phone
   }
   if(req.body.password != null){
       res.user.password = req.body.password
   }
    if(req.body.address!= null){
       res.user.address = req.body.address
   }
    if(req.body.creditCard != null){
       res.user.creditCard = req.body.creditCard
   }
     if(req.body.image != null){
       res.user.image = req.body.image
   }
    if(req.body.role != null){
       res.user.role = req.body.role
   }
   try{

    const updatedUser = await res.user.save()
    res.json(updatedUser)
   }catch(err){

    res.status(400).json({message:err.message})
   }
})
//deleting one
router.delete('/:id',getUser,async (req,res)=>{
    try{
await res.user.remove()
res.json({message:'deleted user'})
    }catch(err){
res.status(500).json({message:err.message})
    }
})
async function getUser(req,res,next){
    try{
user = await User.findById(req.params.id)
if(user == null){
    return res.status(404).json({message:'cannot find user'})
}
    }catch(err){
return res.status(500).json({message:err.message})
    }
   res.user = user 
   next()
}
async function login(req,res,next){
    try{
user = await User.findOne({email:req.body.email})
if(user == null ){
    return res.status(404).json({message:'wrong password or mail'})
}
if(user!=null && user.password !== req.body.password){
    return res.status(404).json({message:'wrong password or mail'})
}


    }catch(err){
return res.status(500).json({message:err.message})
    }
   res.user = user 
   next()
}

//getting the token
router.post('/login',login,async(req,res)=>{
const user = res.user
jwt.sign({user:user},'secretkey', (err,token)=>{
  res.json({
      token:token
  }) ; 
});
})
//format of token
// auth : bearer <access_token
//verify token
function verifyToken(req,res,next){
//Get auth header value
const bearerHeader = req.headers['authorization'];
if(typeof bearerHeader !== 'undefined'){
const bearer = bearerHeader.split(' ');
const bearerToken = bearer[1];
req.token = bearerToken;
next();
}else{
    res.status(403).json({message:'forbidden'})
}
}
//funtion to test the verify token
router.post('/test',verifyToken,(req,res)=>{
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

})
module.exports= router, verifyToken;