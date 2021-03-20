
import Product from '../models/productModel.js';

export const getProducts = async(req, res) => {
    try {
        const productModels = await Product.find();
        console.log('getting products');
        res.status(200).json(productModels);
    } catch (error) {
        res.status(404).json({message: error.message});
        
    }
}

//req.userId
export const createProduct = async(req, res) => {
    const product = req.body;
    const newProduct = await new Product({... product , creator: req.userId});
    try {
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(409).json({message: error.message});
    }

}