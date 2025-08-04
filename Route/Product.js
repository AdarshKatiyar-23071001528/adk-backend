import express from 'express';
import { addProduct, allProduct, deleteProduct, specificProduct, updateProduct } from '../Controller/Product.js';
const router = express.Router();
router.post('/add',addProduct);
router.get('/all',allProduct);
router.delete('/delete/:id',deleteProduct);
router.get('/specificProduct/:id',specificProduct);
router.put('/update/:id',updateProduct);
export default router;