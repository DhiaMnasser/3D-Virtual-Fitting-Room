const mongoose = require('mongoose')
const reviewSchema =new  mongoose.Schema({
userId:{
    type:Number,
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
module.exports = mongoose.model('review',reviewSchema)