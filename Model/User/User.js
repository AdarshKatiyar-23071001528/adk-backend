import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName:{type:String, require:true},
    userEmail:{type:String, require:true},
    userPassword:{type:String, require:true},
    createdAt:{type:Date, default:Date.now()},
})

export const User = mongoose.model("UserDetails", userSchema);