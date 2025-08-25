import Razorpay from "razorpay";
import { Payment } from "../Model/Payment/Payment.js";


const payment = new Razorpay({
    key_id: 'rzp_test_Ry94xZg0gc9Zqj',
    key_secret: 'GhzdQyc7H0i4IKQ8KA9Ja4vj'
});


export const checkOut = async (req, res) => {
    const { amount, cartItems, userShipping, userId } = req.body;

    const options = {
        amount: amount * 100,
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
    };
    const order = await payment.orders.create(options)
    res.json({ message: "Success Full Payment", orderId: order.id, amount: amount, cartItems, userShipping, userId, payStatus: "Created" });
}

export const verify = async (req, res) => {
    const { orderId, paymentId, signature, amount, orderItems, userId, userShipping } = req.body;
    try {
        const order_confirmed = await Payment.create({ orderId, paymentId, signature, amount, orderItems, userId, userShipping, payStatus: "Paid" });

        res.json({ message: "Payment Success ", success: true, order_confirmed })
    } catch (error) {
        res.json({ message: "Payment Verification Error", success: false });

    }



}


export const allOrder = async (req, res) => {
    const userId = req.user;

    try {
        const order = await Payment.find({ userId }).sort({ orderDate: -1 });
        res.json({ message: "All orders", order, success: true });
    } catch (error) {
        res.json({ message: "User Order Error", success: false });

    }
}

export const allPayments = async (req, res) => {
    try {
        const payment = await Payment.find();
        res.json({ payment, success: true });
    }
    catch (error) {
        return res.json({ message: "Failed", success: false });
    }
}
export const OrderConfirmation = async(req,res) =>{

}

export const specificOrder = async(req,res) =>{
    
    try {
        const {orderId} = req.params;
        const order = await Payment.find({orderId});
        res.json({message:"Fetch order", order, success: true})
    } catch (error) {
        return res.json({message:error.message ,success : false});
    }
}