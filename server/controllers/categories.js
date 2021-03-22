
import Category from '../models/Category.js';
import mongoose from 'mongoose';

export const getCategories = async(req, res) => {
    try {
        const categoryModels = await Category.find();
        console.log('getting Categories');
        res.status(200).json(categoryModels);
    } catch (error) {
        res.status(404).send({message: error.message}); 
    }
}

export const getCategoryById = async (req, res) => { 
    const { id } = req.params;

    try {
        const category = await Category.findById(id);
        
        res.status(200).json(category);
    } catch (error) {
        res.status(404).send({ message: error.message });
    }
}

export const createCategory = async(req, res) => {
    console.log(`create category in server ${req}`);
    
    const { categoryName} = req.body;
    const newCategory = await new Category({categoryName});
    try {
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(409).send({message: error.message});
    }
}
              

export const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { categoryName } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No category with id: ${id}`);


    const updatedCategory ={ categoryName };

    await Category.findByIdAndUpdate(id, updatedCategory, { new: true });

    res.status(200).json(updatedCategory);
}

export const deleteCategory = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No category with id: ${id}`);

    await Category.findByIdAndRemove(id);

    res.status(200).json({ message: "Category deleted successfully." });
}
