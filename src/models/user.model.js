import mongoose  from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  firstname:{
    type:String,
    required:true
  },
  lastname:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
},{timestamps:true});

export const UserModel = mongoose.model("users",userSchema);