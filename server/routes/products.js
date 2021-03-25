const express = require('express')
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/products.js');

var router = express.Router();

/* GET products listing. */
router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);



module.exports= router;
