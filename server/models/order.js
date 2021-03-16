const mongoose = require('mongoose')
const product = require('./product').schema;


const orderSchema =new mongoose.Schema({
clientId:{
type:Number,
required:true
},
dateCreated:{
type:Date,
required:true,
default:Date.now
},
dateShipped:{
    type:Date,
    required:false,
    default:Date.now
},
isValid:{
    type:Boolean,
    required:true,
    default:false
},
isShipped:{
    type:Boolean,
    required:true,
    default:false
},
totalPrice:{
    type:Number,
    required:true

},
products:[product]


})
module.exports = mongoose.model('order',orderSchema)