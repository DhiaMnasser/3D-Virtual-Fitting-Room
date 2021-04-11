// import {configureStore} from '@reduxjs/toolkit';
// import productsReducer from "./slices/products";
// import avatarsReducer from "./slices/avatars";
// import categoriesReducer from "./slices/categories";
// import claimsReducer from "./slices/claims";
// import ordersReducer from "./slices/orders";
// import reviewsReducer from "./slices/reviews";
// import reducers from "./slices/index";

// export default configureStore({
// reducer: reducers

// })

import {configureStore} from '@reduxjs/toolkit';
import productsReducer from "./slices/products";
import avatarsReducer from "./slices/avatars";
import categoriesReducer from "./slices/categories";
import claimsReducer from "./slices/claims";
import ordersReducer from "./slices/orders";
import reviewsReducer from "./slices/reviews";
import  { reducers }  from './reducers';
import usersReducer from "./slices/auth";

export default configureStore({
    
reducer:{
    products: productsReducer,
    avatars: avatarsReducer,
    categories: categoriesReducer,
    claims: claimsReducer,
    orders: ordersReducer,
    reviews: reviewsReducer,
    login : reducers ,
    users:usersReducer,

}


})