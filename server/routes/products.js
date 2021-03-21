import express from 'express'
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/products.js';

var router = express.Router();

/* GET products listing. */
router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);



export default router;
