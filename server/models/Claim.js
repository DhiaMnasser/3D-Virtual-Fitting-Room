const mongoose =require( "mongoose");

const claimSchema =new  mongoose.Schema({
userId:{
    type:String,
    required:true
},
message:{
    type:String,
    required:true
}
})

module.exports= mongoose.model("Claim", claimSchema);
