import axios from 'axios'

const url = 'http://localhost:5000';
// const url = process.env.REACT_APP_NODE_APP_URL;
// console.log('process.env.REACT_APP_NODE_APP_URL');
console.log(process.env);
// console.log(process.env.PUBLIC_URL);


const urll = 'http://localhost:5008';
const API = axios.create();
API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});
// products
export const fetchProducts = ()=> axios.get(`/products`);
export const fetchProductById = (id)=> axios.get(`/products/${id}`);
export const createProduct = (newProduct)=> axios.post(`/products`, newProduct);
export const updateProduct = (id, updatedProduct) => axios.patch(`/products/${id}`, updatedProduct);
export const deleteProduct = (id) => axios.delete(`/products/${id}`);
export const smartFetchProduct = (pagination)=> axios.post(`/products/page`, pagination);
export const getNbPages=()=> axios.get(`/products/page/1`);
export const fetchTopProducts = ()=> axios.get(`/products/best`);
export const getRecommendation = (data)=> axios.post(`/products/getRecombeeRecommendation`, data);
export const itemAddedToBasket = (data)=> axios.post(`/products/itemAddedToBasket`, data);

//avatars
export const fetchAvatars = ()=> axios.get(`/avatars`);
export const createAvatar = (newAvatar)=> axios.post(`/avatars`, newAvatar);
export const updateAvatar = (id, updatedAvatar) => axios.patch(`/avatars/${id}`, updatedAvatar);
export const deleteAvatar = (id) => axios.delete(`/avatars/${id}`);
//claims
export const fetchClaims = ()=> axios.get(`/claims`);
export const createClaim = (newClaim)=> axios.post(`/claims`, newClaim);
export const updateClaim = (id, updatedClaim) => axios.patch(`/claims/${id}`, updatedClaim);
export const deleteClaim = (id) => axios.delete(`/claims/${id}`);
export const traiterClaim = (id) => axios.patch(`/claims/${id}/traiterClaim`);
//orders
export const fetchOrders = ()=> axios.get(`/orders`);
export const fetchOrderByUser = (userId)=> axios.get(`/orders/user/${userId}`);
export const createOrder = (client)=> axios.post(`/orders`,client);
export const updateOrder = (id, updatedOrder) => axios.patch(`/orders/${id}`, updatedOrder);
export const deleteOrder = (id) => axios.delete(`/orders/${id}`);
//reviews
export const fetchReviews = ()=> axios.get(`/reviews`);
export const createReview = (newReview)=> axios.post(`/reviews`, newReview);
export const updateReview = (id, updatedReview) => axios.patch(`/reviews/${id}`, updatedReview);
export const deleteReview = (id) => axios.delete(`/reviews/${id}`);
export const likeReview = (id) => API.patch(`/reviews/${id}/likeReview`);
// Categories

export const fetchCategories = ()=> axios.get(`/categories`);
export const createCategory = (newCategory)=> axios.post(`/categories`, newCategory);
export const updateCategory = (id, updatedCategory) => axios.patch(`/categories/${id}`, updatedCategory);
export const deleteCategory = (id) => axios.delete(`/categories/${id}`);
// Messages
export const fetchMessages = ()=> axios.get(`/messages`);
export const createMessage = (newMessage)=> axios.post(`/messages`, newMessage);
export const updateMessage = (id, updatedMessage) => axios.patch(`/messages/${id}`, updatedMessage);
export const deleteMessage = (id) => axios.delete(`/messages/${id}`);

// users

export const signIn = (formData) => API.post('/users/signin', formData);
export const signUp = (formData) => API.post('/users/signup', formData);

export const fetchUsers = ()=> axios.get(`/users`);
export const createUser = (newUser)=> axios.post(`/user`, newUser);
export const updateUser = (id, updatedUser) => axios.patch(`/users/${id}`, updatedUser);
export const deleteUser = (id) => axios.delete(`/user/${id}`);

// files
export const fetchFiles = ()=> axios.get(`/files/files`);
export const fetchFileByName = (fileName)=> axios.get(`/files/file/${fileName}`);
export const fetchFileDataByName = (fileName)=> axios.get(`/files/fileData/${fileName}`);
export const uploadFile = (file)=> axios.post(`/files`, file);
export const deleteFileById = (id) => axios.post(`/files/file/del/${id}`);

export const fetchImageByName = (fileName)=> axios.get(`/files/image/${fileName}`);
export const deleteImageById = (id) => axios.get(`/files/delete/${id}`);
export const uploadFileavatar=(data)=>{
  axios.post(`${urll}/uploadFileAPI`, data);
}
export const customavatr= ()=> axios.get(`${urll}/createavatar`);

