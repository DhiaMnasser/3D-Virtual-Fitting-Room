import mongoose from 'mongoose';

var Schema = mongoose.Schema;

var Product = new Schema({
  productName: String,
  description: String,
//   category: String,
  price: Number,
  size: String,
//   color: String,
  stockQuantity: Number,
  imageFile: String,
  ModelFile: String,
  arModelFile: String,
});

export default mongoose.model("Product", Product);
