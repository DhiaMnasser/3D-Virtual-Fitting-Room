import * as api from "../../api/index";
import { createSlice } from '@reduxjs/toolkit';

export const getClaims = () => async dispatch => {
  try {
    let { data } = await api.fetchClaims();
   

    dispatch(getAllClaims(data)});
  } catch (error) {
    console.log(error.response);
  }
};

export const createClaim = claim => async dispatch => {
  try {
    const data = api.createClaim(claim);
   
    dispatch({ type: "CREATE", payload: data });
  } catch (error) {
    console.log(error.response);
  }
};

export const updateClaim = (id, claim) => async dispatch => {
  try {
    const { data } = await api.updateClaim(id, claim);

    dispatch({ type: "UPDATE", payload: data });
  } catch (error) {
    console.log(error.response);
  }
};


export const deleteClaim = (id) => async (dispatch) => {
  try {
    await api.deleteClaim(id);

    dispatch({ type: 'DELETE', payload: id });
  } catch (error) {
    console.log(error.response);
  }
};


export const claimsSlice = createSlice({
  name:"claims",
  initialState:{
    claims:[]
  
  },
  reducers:{
      getAllClaims(state,action){
          state.claims=action.payload;
      }
  }
  
  });

  export const {getAllClaims} =claimsSlice.actions
  export default claimsSlice.reducer;

