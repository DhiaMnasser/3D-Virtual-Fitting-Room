const mongoose = require('mongoose')
const productSchema =new mongoose.Schema({
productName:{
type:String,
required:true
},
description:{
type:String,
required:true
},
category:{
    type:String,
    required:true
},
price:{
    type:Number,
    required:true
},
size:{
    type:String,
    required:true
},
stockQuantity:{
    type:Number,
    required:true

},
image:{
    type:String
},
threeDmodel:{
    type:String
},
ArModel:{
    type:String 
}

})
module.exports = mongoose.model('product',productSchema)