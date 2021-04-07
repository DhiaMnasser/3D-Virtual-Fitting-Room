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

export const createCategory = (category) => async dispatch => {
  try {
    const data = await api.createCategory(category);

    dispatch(addCategory(data.data));
  } catch (error) {
    console.log(error.response);
  }
};

export const updateCategory = (id, category) => async dispatch => {
  try {
    const  data = await api.updateCategory(id, category);

const datas = {"_id": id, ...data.data}
console.log(datas)
    dispatch(editCategory(datas));
  } catch (error) {
    console.log(error.response);
  }
};


export const deleteCategory = (id) => async (dispatch) => {
  try {
    await api.deleteCategory(id);

    dispatch(removeCategory(id));
  } catch (error) {
    console.log(error.response);
  }
};


export const categoriesSlice = createSlice({
  name:"categories",
  initialState:{
    categories:[],
    
  },
  reducers:{
      getAllCategories(state,action){
          state.categories=action.payload;
      }, 
      addCategory(state,action){
        state.categories.push(action.payload)
    },
    removeCategory(state,action){
        const index = state.categories.findIndex((prod)=> prod._id === action.payload);
        if(index!==-1){
            state.categories.splice(index,1)
        }
    },
    editCategory(state,action){
         const index = state.categories.findIndex((prod)=> prod._id === action.payload._id);
        if(index!==-1){   
            state.categories[index]=action.payload;
        }
    }
  }
  
  });

  export const {getAllCategories,addCategory,removeCategory,editCategory,deselectCategory,selectCategory} =categoriesSlice.actions
  export default categoriesSlice.reducer;

