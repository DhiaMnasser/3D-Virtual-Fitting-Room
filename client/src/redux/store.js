import { combineReducers } from "redux";
import {configureStore} from '@reduxjs/toolkit';

import products from "./reducers/products";
import categories from "./reducers/categories";
import productsReducer from "../redux/slices/products";
import categoriesReducer from "../redux/slices/categories";
import rootReducers from "./reducers";


// export const ()=>console.log('configureStore'+JSON.stringify(productsReducer, null, 4));

export default configureStore({
  reducer: rootReducers,

},

()=>console.log("combineReducers"+JSON.stringify(rootReducers, null, 4)));


// import { combineReducers } from "redux";
// import {configureStore} from '@reduxjs/toolkit';

// import products from "./reducers/products";
// import categories from "./reducers/categories";
// import productsReducer from "../redux/slices/products";
// import categoriesReducer from "../redux/slices/categories";

// // export const ()=>console.log('configureStore'+JSON.stringify(productsReducer, null, 4));

// export default configureStore({
//   reducer:{
//   products: productsReducer,
//   categories: categoriesReducer
//   }
// });
