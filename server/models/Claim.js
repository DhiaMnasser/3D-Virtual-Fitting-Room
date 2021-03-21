import mongoose from "mongoose";

const claimSchema =new  mongoose.Schema({
userId:{
    type:String,
    required:true
},
message:{
    type:String,
    required:true
}
})

export default mongoose.model("Claim", claimSchema);
