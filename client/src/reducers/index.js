import { combineReducers } from "redux";
import products from "./products";
import categories from "./categories";

export const reducers = combineReducers({
  products,
  categories
});
