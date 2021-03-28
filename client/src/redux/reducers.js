import { combineReducers } from "redux";

import productsReducer from "./slices/products";
import avatarsReducer from "./slices/avatars";
import categoriesReducer from "./slices/categories";
import claimsReducer from "./slices/claims";
import ordersReducer from "./slices/orders";
import reviewsReducer from "./slices/reviews";

const reducers = combineReducers({
  products: productsReducer,
  avatars: avatarsReducer,
  categories: categoriesReducer,
  claims: claimsReducer,
  orders: ordersReducer,
  reviews: reviewsReducer,
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
