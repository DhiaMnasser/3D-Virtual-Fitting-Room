import * as api from "../../api/index";
import { createSlice } from '@reduxjs/toolkit';

export const getCategories = () => async dispatch => {
  try {
    let { data } = await api.fetchCategories();
    dispatch(getAllCategories(data));
  } catch (error) {
    console.log(error.response);
  }
};

export const createCategory = category => async dispatch => {
  try {
    const data = api.createCategory(category);

    dispatch({ type: "CREATE", payload: data });
  } catch (error) {
    console.log(error.response);
  }
};

export const updateCategory = (id, category) => async dispatch => {
  try {
    const { data } = await api.updateCategory(id, category);

    dispatch({ type: "UPDATE", payload: data });
  } catch (error) {
    console.log(error.response);
  }
};


export const deleteCategory = (id) => async (dispatch) => {
  try {
    await api.deleteCategory(id);

    dispatch({ type: 'DELETE', payload: id });
  } catch (error) {
    console.log(error.response);
  }
};


export const categoriesSlice = createSlice({
  name:"categories",
  initialState:{
    categories:[]
  
  },
  reducers:{
      getAllCategories(state,action){
          state.categories=action.payload;
      }
  }
  
  });

  export const {getAllCategories} =categoriesSlice.actions
  export default categoriesSlice.reducer;

