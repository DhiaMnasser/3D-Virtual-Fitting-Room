
import Product from '../models/Product.js';
import mongoose from 'mongoose';

export const getProducts = async(req, res) => {
    try {
        const productModels = await Product.find();
        console.log('getting products');
        res.status(200).json(productModels);
    } catch (error) {
        res.status(404).send({message: error.message}); 
    }
}

export const getProductById = async (req, res) => { 
    const { id } = req.params;

    try {
        const product = await Product.findById(id);
        
        res.status(200).json(product);
    } catch (error) {
        res.status(404).send({ message: error.message });
    }
}

export const createProduct = async(req, res) => {
    console.log(`create prod in server ${req}`);
    
    const { productName, description, categoryId, price, size, stockQuantity , image, arModel, theeDModel } = req.body;
    const newProduct = await new Product({productName, description, categoryId, price, size, stockQuantity , image, arModel, theeDModel});
    try {
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(409).send({message: error.message});
        
    }
}
              

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { productName, description, price, size, stockQuantity,  categoryId} = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No product with id: ${id}`);


    const updatedProduct ={ productName, description, categoryId, price, size, stockQuantity, image, arModel, theeDModel };

    await Product.findByIdAndUpdate(id, updatedProduct, { new: true });

    res.status(200).json(updatedProduct);
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No product with id: ${id}`);

    await Product.findByIdAndRemove(id);

    res.status(200).json({ message: "Product deleted successfully." });
}
