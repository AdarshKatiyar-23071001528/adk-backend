import mongoose from "mongoose";

const AddressDetails = mongoose.Schema({
    userAddress:{type:String, require: true},
    userCity:{type:String, require: true},
    userFullName:{type:String, require: true},
    userState:{type:String, require: true},
    userPincode:{type:Number, require:true},
    userPhone:{type:Number, require: true},
    createdAt:{type:Date, default: Date.now()},
    userCountry:{type:String, default:'India'}
})
const addressSchema = mongoose.Schema({
    userID:{type:mongoose.Schema.Types.ObjectId,require : true,ref:"User"},
    fullAddress:[AddressDetails]

});
export const Address = mongoose.model('Address',addressSchema);
