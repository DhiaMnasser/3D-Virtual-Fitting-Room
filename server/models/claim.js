const mongoose = require('mongoose')
const claimSchema =new  mongoose.Schema({
userId:{
    type:Number,
    required:true
},
message:{
    type:String,
    required:true
}
})
module.exports = mongoose.model('claim',claimSchema)