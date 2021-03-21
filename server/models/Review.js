const mongoose = require('mongoose')
const reviewSchema =new  mongoose.Schema({
userId:{
    type:String,
    required:true
},
message:{
    type:String,
    required:true
},
productId:{
    type:Number,
    required:true
},
reviewDate:{
    type:Date,
    required:true,
    default:Date.now
}
})
export default mongoose.model("Review", reviewSchema);
