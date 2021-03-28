const mongoose =require( "mongoose");

var Schema = mongoose.Schema;

var Category = new Schema({
  categoryName: {
    type: String,
    required: true,
    unique: true,
    dropDups: true
  }

});
module.exports=  mongoose.model("Category", Category);
