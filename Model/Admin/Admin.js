import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
    adminName :{type:String, require: true},
    adminEmail:{type:String, require: true},
    adminPassword:{type:String, require: true},
    admitTitle:{type:String, require: true},
    createdAt:{type:Date, default: Date.now()},
});
export const Admin = mongoose.model('AdminDetails', AdminSchema);