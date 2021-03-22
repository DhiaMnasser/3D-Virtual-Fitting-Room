import mongoose from "mongoose";

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
  image: {
    type: String,
    // required: true
  },
  arModel: {
    type: String
  },
  threeDmodel: {
    type: String
  }

});

export default mongoose.model("Product", Product);
