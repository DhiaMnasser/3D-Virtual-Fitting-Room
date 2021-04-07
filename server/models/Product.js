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
  rating:{
    type:Number
  },
  color:{
    type:String
  },
  promo:{
    type:Number
  }


});

module.exports=  mongoose.model("Product", Product);
