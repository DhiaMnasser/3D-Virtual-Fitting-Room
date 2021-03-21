import mongoose from 'mongoose';

const avatarSchema =new  mongoose.Schema({
userId:{
    type:String,
    required:true
},
avatarFile:{
    type:String,
    required:true
}
})
export default mongoose.model("Avatar", avatarSchema);
