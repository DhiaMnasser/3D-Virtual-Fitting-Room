import axios from 'axios'

const url = 'http://localhost:5000';

const urll = 'http://localhost:5008';
const API = axios.create({ baseURL: 'http://localhost:5000/' });
API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});
// products
export const fetchProducts = ()=> axios.get(`${url}/products`);
export const fetchProductById = (id)=> axios.get(`${url}/products/${id}`);
export const createProduct = (newProduct)=> axios.post(`${url}/products`, newProduct);
export const updateProduct = (id, updatedProduct) => axios.patch(`${url}/products/${id}`, updatedProduct);
export const deleteProduct = (id) => axios.delete(`${url}/products/${id}`);
export const smartFetchProduct = (pagination)=> axios.post(`${url}/products/page`, pagination);
export const getNbPages=()=> axios.get(`${url}/products/page/1`);
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
export const traiterClaim = (id) => axios.patch(`${url}/claims/${id}/traiterClaim`);
//orders
export const fetchOrders = ()=> axios.get(`${url}/orders`);
export const fetchOrderByUser = (userId)=> axios.get(`${url}/orders/user/${userId}`);
export const createOrder = (newOrder)=> axios.post(`${url}/orders`, newOrder);
export const updateOrder = (id, updatedOrder) => axios.patch(`${url}/orders/${id}`, updatedOrder);
export const deleteOrder = (id) => axios.delete(`${url}/orders/${id}`);
//reviews
export const fetchReviews = ()=> axios.get(`${url}/reviews`);
export const createReview = (newReview)=> axios.post(`${url}/reviews`, newReview);
export const updateReview = (id, updatedReview) => axios.patch(`${url}/reviews/${id}`, updatedReview);
export const deleteReview = (id) => axios.delete(`${url}/reviews/${id}`);
export const likeReview = (id) => API.patch(`/reviews/${id}/likeReview`);
// Categories

export const fetchCategories = ()=> axios.get(`${url}/categories`);
export const createCategory = (newCategory)=> axios.post(`${url}/categories`, newCategory);
export const updateCategory = (id, updatedCategory) => axios.patch(`${url}/categories/${id}`, updatedCategory);
export const deleteCategory = (id) => axios.delete(`${url}/categories/${id}`);

// users

export const signIn = (formData) => API.post('/users/signin', formData);
export const signUp = (formData) => API.post('/users/signup', formData);

export const fetchUsers = ()=> axios.get(`${url}/users`);
export const createUser = (newUser)=> axios.post(`${url}/user`, newUser);
export const updateUser = (id, updatedUser) => axios.patch(`${url}/users/${id}`, updatedUser);
export const deleteUser = (id) => axios.delete(`${url}/user/${id}`);

// files
export const fetchFiles = ()=> axios.get(`${url}/files/files`);
export const fetchFileByName = (fileName)=> axios.get(`${url}/files/file/${fileName}`);
export const uploadFile = (file)=> axios.post(`${url}/files`, file);
export const deleteFileById = (id) => axios.post(`${url}/files/file/del/${id}`);

export const fetchImageByName = (fileName)=> axios.get(`${url}/files/image/${fileName}`);
export const deleteImageById = (id) => axios.get(`${url}/files/delete/${id}`);
export const uploadFileavatar=(event)=>{
  const data = new FormData() ;
  data.append('file', event.target.files[0]);
  axios.post(`${urll}/uploadFileAPI`, data)
      .then(res => { // then print response status
        console.log(res.statusText)
      })
}
export const customavatr= ()=> axios.get(`${urll}/createavatar`);
