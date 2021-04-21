const mongoose =require( "mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required:  true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
  role: {type:Number, default:0},
  passwordReset: { type: String, select: false }
});

module.exports=  mongoose.model("User", userSchema);