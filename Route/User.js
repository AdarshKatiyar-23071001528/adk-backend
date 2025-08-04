import express from 'express';
import { userProfile, userLogin, userRegister, allUser } from '../Controller/User.js';
import { isAutheticate } from '../Middleware/Auth.js';
const router = express.Router();

router.post('/register',userRegister);
router.post('/login',userLogin);
router.get('/profile',isAutheticate,userProfile)
router.get('/allUser',allUser);
export default router;