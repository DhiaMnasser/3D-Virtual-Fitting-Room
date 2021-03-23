import axios from 'axios'

const url = 'http://localhost:5000';
const API = axios.create({ baseURL: 'http://localhost:5000/' });

// products
export const fetchProducts = ()=> axios.get(`${url}/products`);
export const createProduct = (newProduct)=> axios.post(`${url}/products`, newProduct);
export const updateProduct = (id, updatedProduct) => axios.patch(`${url}/products/${id}`, updatedProduct);
export const deleteProduct = (id) => axios.delete(`${url}/products/${id}`);

// Categories
export const fetchCategories = ()=> axios.get(`${url}/categories`);
export const createCategory = (newCategory)=> axios.post(`${url}/categories`, newCategory);
export const updateCategory = (id, updatedCategory) => axios.patch(`${url}/categories/${id}`, updatedCategory);
export const deleteCategory = (id) => axios.delete(`${url}/categories/${id}`);

// users

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
  });
