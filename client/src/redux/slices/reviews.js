import * as api from "../../api/index";
import { createSlice } from '@reduxjs/toolkit';


export const getReviews = () => async dispatch => {
  try {
    const { data } = await api.fetchReviews();

    // dispatch({ type: "FETCH_ALL", payload: data });
    dispatch(getAllReviews(data));
  } catch (error) {
    console.log(error.response);
  }
};

export const createReview = review => async dispatch => {
  try {
    const data = await api.createReview(review);
   
    dispatch({ type: "CREATE", payload: data });
  } catch (error) {
    console.log(error.response);
  }
};

export const updateReview = (id, review) => async dispatch => {
  try {
    const { data } = await api.updateReview(id, review);

    dispatch({ type: "UPDATE", payload: data });
  } catch (error) {
    console.log(error.response);
  }
};


export const deleteReview = (id) => async (dispatch) => {
  try {
    await api.deleteReview(id);

    dispatch({ type: 'DELETE', payload: id });
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
      }
  }
  });

  export const {getAllReviews} =reviewsSlice.actions
  export default reviewsSlice.reducer;


