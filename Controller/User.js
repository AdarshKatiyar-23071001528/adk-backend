import bcrypt from "bcryptjs";
import { User } from "../Model/User/User.js";
import jwt from 'jsonwebtoken';

export const userRegister = async (req, res) => {
    try {
        const { userName, userEmail, userPassword } = req.body;
        const user = await User.findOne({ userEmail });
        if (user) return res.json({ message: "User already exist", success: false });
        const securePassword = await bcrypt.hash(userPassword, 10);
        const newUser = await User.create({ userName, userEmail, userPassword: securePassword });
        res.json({ message: "Registration Successful", newUser, success: true });
    }
    catch (error) {
        res.json({ message: error.message });
    }
}

export const userLogin = async (req, res) => {
    try {
        const { userEmail, userPassword } = req.body;
        const user = await User.findOne({ userEmail });
        if (!user) return res.json({ message: "User is not registered", success: false });
        const vaildPass = bcrypt.compare(userPassword, user.userPassword);
        if (!vaildPass) return res.json({ message: "Invaild Credential" });
        const userToken = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, { expiresIn: '10d' });
        res.json({ message: `Welcome ${user.userName}`, userToken, success: true });
    }
    catch (error) {
        res.json({ message: error.message });
    }

}

export const userProfile = async (req, res) => {
    const userID = req.user;
    const _id = userID;
    let profile = await User.findById({ _id });
    try {
        res.json({message:`welcome ${profile.userName}`,profile})
    } catch (error) {
        res.json({ message: error.message, success: false });
    }
}

export const allUser = async(req,res) =>{
    let users = await User.find();
    try{
        res.json({message: `All Users`, users, success : true});
    }
    catch(err){
        res.json({message: err.message, succces: false});
    }
}