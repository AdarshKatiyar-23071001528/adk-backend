import { Admin } from "../Model/Admin/Admin.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const adminRegister = async (req, res) => {

    try {
        const { adminName, adminEmail, adminTitle, adminPassword } = req.body;
        let admin = await Admin.findOne({ adminEmail });
        if (!admin) {
            const securePassword = await bcrypt.hash(adminPassword, 10);
            const newAdmin = await Admin.create({ adminName, adminEmail, adminTitle, adminPassword: securePassword });
            res.json({ message: "Admin Create SuccessFull", newAdmin, success: true });
        }
        else {
            res.json({ message: 'admin already registered', success: false });
        }
    }
    catch (err) {
        res.json({ message: err.message, success: true });
    }


}


export const adminLogin = async (req, res) => {

    try {
        const { adminEmail, adminPassword } = req.body;
        let admin = await Admin.findOne({ adminEmail });
        if (!admin) return res.json({ message: "Admin not registered", success: false });
        let vaildPass = await bcrypt.compare(adminPassword, admin.adminPassword);
        if (!vaildPass) return res.json({ message: "Enter vaild credential", success: false });
        let adminToken = jwt.sign({ _id: admin._id }, process.env.SECRET_KEY, { expiresIn: '1d' });
        return res.json({ message: "Login SuccesFul", adminToken, success: true });

    }
    catch (err) {
        res.json({ message: err.message, success: true });
    }

}

export const forOne = async(req,res) =>{
    const admin = await Admin.find();
    res.json({length:admin.length});  
}