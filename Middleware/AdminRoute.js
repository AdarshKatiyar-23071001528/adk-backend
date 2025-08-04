import { Admin } from '../Model/Admin/Admin.js';
import jwt from 'jsonwebtoken';
export const adminAuthenticate = async(req,res) =>{
    const adminToken = req.header("adminToken");
    if(!adminToken) return res.json("Login First");
    const decode = jwt.verify(adminToken,process.env.SECRET_KEY)
    const _id = decode._id;
    const vaildAdmin = await Admin.findById(_id);
    if(!vaildAdmin) res.json({message: "Not Vaild Admin", success: false});
    res.json({message:"Vaild",success: true});   
}