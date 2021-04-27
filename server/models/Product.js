const mongoose =require( "mongoose");

var Schema = mongoose.Schema;

var Product = new Schema({
  productName: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  categoryId: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  gender: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  stockQuantity: {
    type: Number,
    required: true,
    min: 1
  },
  image: [String],
  arModel: {
    type: String
  },
  threeDModel: {
    type: String
  },
  color:{
    type:String
  },
  promo:{
    type:Number
  },
  rating:{
    type:Number,
    min: 0
  },
  nbrating:{
    type:Number,
    min: 0
  },
  likes:{
    type:Number,
    min: 0
  },
  dlikes:{
    type:Number,
    min: 0
  },

});

module.exports=  mongoose.model("Product", Product);
