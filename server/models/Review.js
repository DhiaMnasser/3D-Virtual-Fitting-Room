const mongoose =require( "mongoose");
const reviewSchema =new  mongoose.Schema({
creator_id:{
    type:String,
    required:true
},
creator:{
    type:String,
    required:true
},
message:{
    type:String,
    required:true
},
productId:{
    type:String,
    required:true
},
reviewDate:{
    type:Date,
    required:true,
    default:Date.now
},
likeCount: {
    type: Number,
    default: 0,
},
likes: { type: [String], default: [] },

})
module.exports=  mongoose.model("Review", reviewSchema);
