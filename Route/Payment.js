import express from 'express';
import { checkOut, allOrder, verify,OrderConfirmation } from '../Controller/Payment.js';
import { isAutheticate } from '../Middleware/Auth.js';


const router = express.Router();

router.post('/checkout',checkOut);
router.post('/verify',verify)
router.get('/allOrder',isAutheticate, allOrder )
router.get('/confirmed',isAutheticate, OrderConfirmation )
export default router;