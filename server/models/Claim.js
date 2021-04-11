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
<<<<<<< HEAD
}

=======
},
status:{
    type:String,
    required:false
},
type:{
    type:String,
    required:false
},
Réf:{
    type:String,
    required:false
}
>>>>>>> hajer3
})

module.exports= mongoose.model("Claim", claimSchema);
