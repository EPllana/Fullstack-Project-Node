import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minglength:6,
    },
    phoneNumber:{
        type:String,
        default:null,
    },
    isActive:{
        type:Boolean, default:"true"
    },
    role: {
        type: String,
        enum: ["admin", "user", "moderator"],
        default: "user",
      },
},{timestamps:true}// tregon daten e krijimit dhe update

);

const User = mongoose.model("User", userSchema)
export default User;