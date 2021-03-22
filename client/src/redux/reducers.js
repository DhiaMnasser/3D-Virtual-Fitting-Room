import { combineReducers } from "redux";

import categoriesReducer from "./slices/categories";
import productsReducer from "./slices/products";

const reducers = combineReducers({
  products: productsReducer,
  categories: categoriesReducer
});


export default reducers;


// import { combineReducers } from "redux";


// import products from "./reducers/products";
// import categories from "./reducers/categories";

// const reducers = combineReducers({
//   products,
//   categories
// });

// export default reducers;
