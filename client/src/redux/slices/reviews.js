import * as api from "../../api/index";
import { createSlice } from '@reduxjs/toolkit';


export const getReviews = () => async dispatch => {
  try {
    const {data}  = await api.fetchReviews();

    // dispatch({ type: "FETCH_ALL", payload: data });
    dispatch(getAllReviews(data));
  } catch (error) {
    console.log(error.response);
  }
};

export const createReview = review => async dispatch => {
  try {
    const data = await api.createReview(review);
   
    dispatch(addReview(data));
  } catch (error) {
    console.log(error.response);
  }
};

export const updateReview = (id, review) => async dispatch => {
  try {
    const { data } = await api.updateReview(id, review);

    dispatch(editReview(data));
  } catch (error) {
    console.log(error.response);
  }
};
export const likeReview = (id) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem('profile'));

  try {
    const { data } = await api.likeReview(id, user?.token);

    dispatch( like(data) );
  } catch (error) {
    console.log(error);
  }
};

export const deleteReview = (id) => async (dispatch) => {
  try {
    await api.deleteReview(id);

    dispatch(removeReview(id));
  } catch (error) {
    console.log(error.response);
  }
};

export const reviewsSlice = createSlice({
  name:"reviews",
  initialState:{
      reviews:[]
  
  },
  reducers:{
      getAllReviews(state,action){
          state.reviews=action.payload;
          // console.log("in slice"+ JSON.stringify(state.reviews, null, 4));   
      },
        addReview(state,action){
        state.reviews.push(action.payload)
    },
    removeReview(state,action){
        const index = state.reviews.findIndex((prod)=> prod._id === action.payload);
        if(index!==-1){
            state.reviews.splice(index,1)
        }
    },
    editReview(state,action){
         const index = state.reviews.findIndex((prod)=> prod._id === action.payload._id);
        if(index!==-1){   
            state.reviews[index]=action.payload;
        }
    },
    like(state,action){
      const index = state.reviews.findIndex((prod)=> prod._id === action.payload._id);
        if(index!==-1){   
            state.reviews[index]=action.payload;
        } 
    }

    
  }
  });

  export const {getAllReviews,addReview,editReview,removeReview,like} =reviewsSlice.actions
  export default reviewsSlice.reducer;




