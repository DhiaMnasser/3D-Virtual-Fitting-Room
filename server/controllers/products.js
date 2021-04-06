
const Product =require('../models/Product.js');
const mongoose =require('mongoose');

 const getProducts = async(req, res) => {
    try {
        const productModels = await Product.find();
        console.log('getting products');
        res.status(200).json(productModels);
    } catch (error) {
        res.status(404).send({message: error.message}); 
    }
}

 const getProductById = async (req, res) => { 
    const { id } = req.params;

    try {
        const product = await Product.findById(id);
        
        res.status(200).json(product);
    } catch (error) {
        res.status(404).send({ message: error.message });
    }
}

const createProduct = async(req, res) => {
    console.log(`create prod in server ${req}`);
    
    const { productName, description, categoryId, price, size, stockQuantity , image, arModel, threeDModel,rating,promo,color } = req.body;
    const newProduct = await new Product({productName, description, categoryId, price, size, stockQuantity , image, arModel, threeDModel,rating,promo,color});
    try {
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(409).send({message: error.message});
        
    }
}
              

 const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { productName, description, categoryId, price, size, stockQuantity , image, arModel, threeDModel,rating,promo,color} = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No product with id: ${id}`);


    const updatedProduct ={ productName, description, categoryId, price, size, stockQuantity , image, arModel, threeDModel,rating,promo,color };

    await Product.findByIdAndUpdate(id, updatedProduct, { new: true });

    res.status(200).json(updatedProduct);
}

 const deleteProduct = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No product with id: ${id}`);

    await Product.findByIdAndRemove(id);

    res.status(200).json({ message: "Product deleted successfully." });
}
module.exports= {deleteProduct,updateProduct,createProduct,getProductById,getProducts} 