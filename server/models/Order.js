const mongoose =require( "mongoose");
const Product =require( "./Product.js");

const orderSchema = new mongoose.Schema({
  clientId: {
    type: String,
    required: true
  },
  clientName: {
    type: String
  },
  ref: {
    type: Date,
    default: Date.now()
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  dateShipped: {
    type: Date,
  },
  address: {
    type: String,
    // required: true
  },
  isValid: {
    type: Boolean,
    default: false
  },
  isShipped: {
    type: Boolean,
    default: false
  },
  totalPrice: {
    type: Number,
    default: 0
  },
  products: [Product.schema]
});
module.exports=  mongoose.model("Order", orderSchema);
