const mongoose =require( "mongoose");


const MessageSchema = mongoose.Schema({
    id: { type: String },
    name: { type: String, required:  true },
    email: { type: String, required: true },
    site: { type: String, required: true },
    message: { type: String, required: true },
  });
  
  module.exports=  mongoose.model("Message", MessageSchema);