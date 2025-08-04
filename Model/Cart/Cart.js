import mongoose from 'mongoose';
const cartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        require: true
    },
    productQty : {
        type: Number,
        default:1
    },
    productTitle:{
        type:String,
        require: true
    },
    productPrice:{
        type: Number,
        require: true
    },
    productImg:{
        type:String,
        require: true
    }

})
const cartSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true,
    },
    items : [cartItemSchema]
})

export const Cart = mongoose.model('Cart',cartSchema);