const mongoose = require('mongoose')
const userSchema =new mongoose.Schema({
name:{
type:String,
required:true
},
password:{
type:String,
required:true
},
phone:{
    type:String,
    required:true
},
address:{
    type:String,
    required:false
},
email:{
    type:String,
    unique:true,
    required:true
},
creditCard:{
    type:String,
    required:true

},
image:{
type:String,
required:false
},
role:{
    type:String,
    default:"user"
}
})
module.exports = mongoose.model('user',userSchema)