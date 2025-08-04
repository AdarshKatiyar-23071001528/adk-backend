import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import adminRouter from './Route/Admin.js';
import userRouter from './Route/User.js';
import productRouter from './Route/Product.js';
import cartRouter from './Route/Cart.js';
import addressRouter from './Route/Address.js';
import paymentRouter from './Route/Payment.js';
import cors from 'cors';
dotenv.config();
const app = express();



app.use(express.json())

app.use(cors({
    origin: true,
    methods:["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))


mongoose.connect(process.env.CONNECTION_STRING,{dbName:"ECOMMERCE_DATABASE"})
.then(()=> console.log("Mongoose Connect...."))
.catch(err => console.log(err.message));

// admin Router
app.use('/api/admin',adminRouter);
// User Router
app.use('/api/user',userRouter);
//product Router
app.use('/api/product',productRouter);
//cart Router
app.use('/api/cart',cartRouter);
//Address Router
app.use('/api/address',addressRouter);
//payment Router
app.use('/api/payment',paymentRouter);
const port = 2002;
app.listen(port, ()=>{
    console.log(`Server listen on ${port}`);
})