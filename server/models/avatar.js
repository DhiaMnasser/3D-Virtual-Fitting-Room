const mongoose = require('mongoose')
const avatarSchema =new  mongoose.Schema({
userId:{
    type:Number,
    required:true
},
avatarFile:{
    type:String,
    required:true
}
})
module.exports = mongoose.model('avatar',avatarSchema)