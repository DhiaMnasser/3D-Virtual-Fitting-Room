import {configureStore} from '@reduxjs/toolkit';
import productsReducer from "./slices/products";
import avatarsReducer from "./slices/avatars";
import categoriesReducer from "./slices/categories";
import claimsReducer from "./slices/claims";
import ordersReducer from "./slices/orders";
import reviewsReducer from "./slices/reviews";
// import authReducer from "./reducers/auth/";
import rootReducers from "./reducers";

export default configureStore({
reducer:{
    products: productsReducer,
    avatars: avatarsReducer,
    categories: categoriesReducer,
    claims: claimsReducer,
    orders: ordersReducer,
    reviews: reviewsReducer,
    // auth: authReducer

}

})