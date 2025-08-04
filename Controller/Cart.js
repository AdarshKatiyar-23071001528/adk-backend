import { Cart } from "../Model/Cart/Cart.js";
import { User } from "../Model/User/User.js";
export const addItem = async (req, res) => {
    const userID = req.user;
    const { productId, productQty, productPrice, productTitle, productImg } = req.body;
    let cart = await Cart.findOne({ userID });
    if (!cart) {
        cart = new Cart({ userID, items: [] });
        cart.items.push({ productId, productQty, productPrice, productTitle, productImg });
        res.json({ message: "Item add in Cart first time", cart, success: true });
    }
    else {
        let isItem = cart?.items?.findIndex((item) => item?.productId?.toString() === productId);
        if (isItem > -1) {
            const singlePrice = cart.items[isItem].productPrice / cart.items[isItem].productQty;
            cart.items[isItem].productQty += productQty;
            cart.items[isItem].productPrice += singlePrice;
            res.json({ message: "Updated Item", cart, success: true });
        }
        else {
            cart.items.push({ productId, productQty, productPrice, productTitle, productImg });
            res.json({ message: "Item add in Cart", cart, success: true });
        }
    }
    await cart.save();
}


export const deleteItem = async (req, res) => {
    try {
        const userID = req.user;
        const { id } = req.params;

        let cart = await Cart.findOne({ userID });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found", success: false });
        }

        const isItem = cart.items.findIndex(item => item.productId == id);

        if (isItem > -1) {
            // item exists, remove it
            cart.items = cart.items.filter(item => item.productId != id);
            await cart.save();
            return res.json({ message: "Item deleted successfully", cart, success: true });
        } else {
            return res.status(404).json({ message: "Item not found in cart", success: false });
        }

    } catch (error) {
        console.error("Delete item error:", error);
        return res.status(500).json({ message: "Server error", success: false });
    }
};



export const dereaseQty = async (req, res) => {
    const userID = req.user;
    const { id } = req.params;
    try {
        let cart = await Cart.findOne({ userID });
        if (!cart) {
            cart = new Cart({ userID, items: [] });
            return res.json({message:"Cart is empty!"});
        }
        else {
            let isItem = cart.items.findIndex(item => item.productId.toString() == id);
            if (isItem > -1) {
                if (cart.items[isItem].productQty == 1) {
                    cart.items = cart.items.filter(item => item.productId.toString() !== id);
                }
                else {
                    const singlePrice = cart.items[isItem].productPrice / cart.items[isItem].productQty;
                    cart.items[isItem].productQty -= 1;
                    cart.items[isItem].productPrice -= singlePrice;
                    
                }
                await cart.save();
                return res.json({message: "Increase Quantity Successfull",cart, success: true});
            }
            else{
                return res.json({message:"Item has not found",cart, success:false });
            }
        }

    }
    catch(err){
        res.json({message: err.message, success: false});
    }
    
}

export const clearCart = async (req, res) => {
    const userID = req.user;
    let cart = await Cart.findOne({ userID });
    cart.items = [];
    await cart.save();
    res.json({ message: "Cart is Clear", cart });
}


export const showCart = async (req, res) => {
    const _id = req.user;
    const userID = _id;
    let user = await User.findById({ _id });
    let cart = await Cart.findOne({ userID });
    res.json({ message: `${user.userName} Cart`, cart, success: true });
}