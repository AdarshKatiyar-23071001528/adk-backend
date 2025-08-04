import express from 'express';
import { adminLogin, adminRegister, forOne } from '../Controller/Admin.js';
import { adminAuthenticate } from '../Middleware/AdminRoute.js';
import { adminAuthenticated } from '../Middleware/AdminAuth.js';
import { allPayments } from '../Controller/Payment.js';
const router = express.Router();


router.post('/register',adminRegister);
router.post('/login', adminLogin);
router.get('/vaild',adminAuthenticate);
router.get('/payments',adminAuthenticated,allPayments);
router.get('/length',forOne);
export default router;