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
    
    dispatch(addProduct(data));
  } catch (error) {
    console.log(error.response);
  }
};

export const updateProduct = (id, product) => async dispatch => {
  try {
    const { data } = await api.updateProduct(id, product);

    dispatch(editProduct(data));
  } catch (error) {
    console.log(error.response);
  }
};


export const deleteProduct = (id) => async (dispatch) => {
 try{
    await api.deleteProduct(id);

    dispatch(removeProduct(id));
 }catch (error) {
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
      },
        addProduct(state,action){
        state.products.push(action.payload)
    },
    removeProduct(state,action){
        const index = state.products.findIndex((prod)=> prod._id === action.payload);
        if(index!==-1){
            state.products.splice(index,1)
        }
    },
    editProduct(state,action){
         const index = state.products.findIndex((prod)=> prod._id === action.payload._id);
        if(index!==-1){   
            state.products[index]=action.payload;
        }
    },
  }
  });

  export const {getAllProducts, editProduct,removeProduct,addProduct} =productsSlice.actions
  export default productsSlice.reducer;


