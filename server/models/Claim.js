const mongoose =require( "mongoose");

const claimSchema =new  mongoose.Schema({
message:{
    type:String,
    required:true
},
creator:{
    type:String,
    required:false
}
,
creator_id:{
    type:String,
    required:false
}

})

module.exports= mongoose.model("Claim", claimSchema);
