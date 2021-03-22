import * as api from "../../api/index";
import { createSlice } from '@reduxjs/toolkit';


export const getProducts = () => async dispatch => {
  try {
    const { data } = await api.fetchProducts();

    // dispatch({ type: "FETCH_ALL", payload: data });
    dispatch(getAllProducts(data));
  } catch (error) {
    console.log(error.response);
  }
};

export const createProduct = product => async dispatch => {
  try {
    const data = await api.createProduct(product);
    
    dispatch({ type: "CREATE", payload: data });
  } catch (error) {
    console.log(error.response);
  }
};

export const updateProduct = (id, product) => async dispatch => {
  try {
    const { data } = await api.updateProduct(id, product);

    dispatch({ type: "UPDATE", payload: data });
  } catch (error) {
    console.log(error.response);
  }
};


export const deleteProduct = (id) => async (dispatch) => {
  try {
    await api.deleteProduct(id);

    dispatch({ type: 'DELETE', payload: id });
  } catch (error) {
    console.log(error.response);
  }
};

export const productsSlice = createSlice({
  name:"products",
  initialState:{
      products:[]
  
  },
  reducers:{
      getAllProducts(state,action){
          state.products=action.payload;
          // console.log("in slice"+ JSON.stringify(state.products, null, 4));   
      }
  }
  });

  export const {getAllProducts} =productsSlice.actions
  export default productsSlice.reducer;


