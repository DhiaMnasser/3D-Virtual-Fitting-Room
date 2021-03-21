import axios from 'axios'

const url = 'http://localhost:5000';

// products
export const fetchProducts = ()=> axios.get(`${url}/products`);
export const createProduct = (newProduct)=> axios.post(`${url}/products`, newProduct)
    .then(()=>{
        console.log("this is api");
    });
export const updateProduct = (id, updatedProduct) => axios.patch(`${url}/products/${id}`, updatedProduct);
export const deleteProduct = (id) => axios.delete(`${url}/products/${id}`);

// Categories
export const fetchCategories = ()=> axios.get(`${url}/categories`);
export const createCategory = (newCategory)=> axios.post(`${url}/categories`, newCategory)
    .then(()=>{
        console.log("this is api");
    });
export const updateCategory = (id, updatedCategory) => axios.patch(`${url}/categories/${id}`, updatedCategory);
export const deleteCategory = (id) => axios.delete(`${url}/categories/${id}`);