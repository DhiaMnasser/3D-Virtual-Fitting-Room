const mongoose =require( "mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required:  true },
  email: { type: String, required: true },
  gender: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
  role: {type:Number, default:0},
  size :{type:String, default:"M"},
  jeansize:{type:Number, default:28},
  bodyshape:{type:String, default:"oval"},
  avatar:{type:String ,default:""},
  
});

module.exports=  mongoose.model("User", userSchema);