import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productTitle:{type:String, require:true},
    productPrice:{type:Number, require: true},
    productCategory:{type:String, require:true},
    productMainCategory:{type:String, require: true},
    productDesc:{type:String, require:true},
    productQty:{type:Number, require:true},
    productImg:{type:String, require:true},
    createdAt:{type:Date, default:Date.now()}
},{strict:false});

export const Product  = mongoose.model('Product',productSchema)