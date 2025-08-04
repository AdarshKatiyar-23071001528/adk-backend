import jwt from 'jsonwebtoken';
import { User } from '../Model/User/User.js';
export const isAutheticate = async (req, res, next) => {
    const userToken = req.header("userToken");
    if (!userToken) return res.json({ message: "Login first" });
    const decode = jwt.verify(userToken, process.env.SECRET_KEY)
    const _id = decode._id;
    let vaildUser = await User.findById(_id);
    if (!vaildUser) {
        return res.json({ message: "User not exist", success: false });
    }
    req.user = _id;
    next();
}