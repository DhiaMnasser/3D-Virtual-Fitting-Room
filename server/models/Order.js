const mongoose =require( "mongoose");
const Product =require( "./Product.js");

const orderSchema = new mongoose.Schema({
  clientId: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
    required: true,
    default: Date.now
  },
  dateShipped: {
    type: Date,
    required: false
  },
  isValid: {
    type: Boolean,
    required: true,
    default: false
  },
  isShipped: {
    type: Boolean,
    required: true,
    default: false
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0
  },
  products: [Product.schema]
});
module.exports=  mongoose.model("Order", orderSchema);
