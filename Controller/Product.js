import { Product } from "../Model/Product/Product.js"

export const addProduct = async (req, res) => {
    try {
        const { productTitle, productDesc, productPrice,productMainCategory, productCategory, productQty, productImg } = req.body;
        const product = await Product.create({ productTitle, productDesc, productPrice,productMainCategory, productCategory, productQty, productImg });
        res.json({ message: "Product Add Successful", product, success: true });
    }
    catch (error) {
        res.json({ message: error.message, success: false });
    }

}
// all Product
export const allProduct = async (req, res) => {
    try {
        const product = await Product.find();
        res.json({ message: "All Product", product });
    }
    catch (error) {
        res.json({ message: error.message });
    }
}

// delete product
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) return res.json({ message: "Product is not listed", success: false });
        res.json({ message: "Delete product", product, success: true });
    }
    catch (err) {
        res.json({ message: err.message });
    }
}

//update Product by id
export const specificProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) return res.json({ message: "Product is not listed", success: false });
        res.json({ message: "Fetch product", product, success: true });
    }
      catch (err) {
        res.json({ message: err.message });
    }
}

//update Product by id
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id,req.body,{new:true});
        if (!product) return res.json({ message: "Product is not listed", success: false });
        res.json({ message: "update product", product, success: true });
    }
      catch (err) {
        res.json({ message: err.message });
    }
}