const mongoose =require( "mongoose");

const avatarSchema =new  mongoose.Schema({
userId:{
    type:String,
    required:true
},
avatarFile:{
    type:String,
    required:true
}
})
module.exports= mongoose.model("Avatar", avatarSchema);
