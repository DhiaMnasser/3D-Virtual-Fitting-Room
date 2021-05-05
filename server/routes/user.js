const express= require("express");

const User = require('../models/user')

const { signin, signup, refresh,getusers ,updateUser,setsize,setAvatar  }= require("../controllers/users.js");
var router = express.Router();
router.post("/signin", signin);
router.post("/signup", signup);
router.post("/token",refresh)
router.get("/", getusers);
router.patch("/:id", updateUser);
router.patch("/:id/:s/:j/:b", setsize);
router.patch("/setavatar/:id", setAvatar);
/*router.get('/', async(req,res)=>{
try{
const users = await User.find()
res.json(users)
}catch (err){
res.status(500).json({message:err.message})

}
})*/
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
module.exports= router;