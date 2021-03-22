import mongoose from "mongoose";

var Schema = mongoose.Schema;

var Category = new Schema({
  categoryName: {
    type: String,
    required: true,
    unique: true,
    dropDups: true
  }

});

export default mongoose.model("Category", Category);
