import axios from 'axios'

const url = 'http://localhost:5000';
const API = axios.create({ baseURL: 'http://localhost:5000/' });

// products
export const fetchProducts = ()=> axios.get(`${url}/products`);
export const createProduct = (newProduct)=> axios.post(`${url}/products`, newProduct);
export const updateProduct = (id, updatedProduct) => axios.patch(`${url}/products/${id}`, updatedProduct);
export const deleteProduct = (id) => axios.delete(`${url}/products/${id}`);
//avatars
export const fetchAvatars = ()=> axios.get(`${url}/avatars`);
export const createAvatar = (newAvatar)=> axios.post(`${url}/avatars`, newAvatar);
export const updateAvatar = (id, updatedAvatar) => axios.patch(`${url}/avatars/${id}`, updatedAvatar);
export const deleteAvatar = (id) => axios.delete(`${url}/avatars/${id}`);
//claims
export const fetchClaims = ()=> axios.get(`${url}/claims`);
export const createClaim = (newClaim)=> axios.post(`${url}/claims`, newClaim);
export const updateClaim = (id, updatedClaim) => axios.patch(`${url}/claims/${id}`, updatedClaim);
export const deleteClaim = (id) => axios.delete(`${url}/claims/${id}`);
//orders
export const fetchOrders = ()=> axios.get(`${url}/orders`);
export const createOrder = (newOrder)=> axios.post(`${url}/orders`, newOrder);
export const updateOrder = (id, updatedOrder) => axios.patch(`${url}/orders/${id}`, updatedOrder);
export const deleteOrder = (id) => axios.delete(`${url}/orders/${id}`);
//reviews
export const fetchReviews = ()=> axios.get(`${url}/reviews`);
export const createReview = (newReview)=> axios.post(`${url}/reviews`, newReview);
export const updateReview = (id, updatedReview) => axios.patch(`${url}/reviews/${id}`, updatedReview);
export const deleteReview = (id) => axios.delete(`${url}/reviews/${id}`);
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
export const fetchUsers = ()=> axios.get(`${url}/users`);
export const createUser = (newUser)=> axios.post(`${url}/users`, newUser);
export const updateUser = (id, updatedUser) => axios.patch(`${url}/users/${id}`, updatedUser);
export const deleteUser = (id) => axios.delete(`${url}/users/${id}`);
//file
export const createFile = (newFile)=> axios.post(`${url}/files`, newFile);
export const uploadFile=(event)=>{
  const data = new FormData() ;
  data.append('file', event.target.files[0]);
  axios.post(`${url}/uploadFileAPI`, data)
      .then(res => { // then print response status
        console.log(res.statusText)
      })
}