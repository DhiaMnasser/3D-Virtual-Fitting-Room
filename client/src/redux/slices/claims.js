import * as api from "../../api/index";
import { createSlice } from '@reduxjs/toolkit';

export const getClaims = () => async dispatch => {
  try {
    let { data } = await api.fetchClaims();
   

    dispatch(getAllClaims(data));
  } catch (error) {
    console.log(error.response);
  }
};

export const createClaim = claim => async dispatch => {
  try {
    const data = api.createClaim(claim);
   
    dispatch(addClaim(data));
  } catch (error) {
    console.log(error.response);
  }
};

export const updateClaim = (id, claim) => async dispatch => {
  try {
    const { data } = await api.updateClaim(id, claim);

    dispatch(editClaim(data));
  } catch (error) {
    console.log(error.response);
  }
};
<<<<<<< HEAD

=======
export const traiterClaim = (id) => async dispatch => {
  try {
    const { data } = await api.traiterClaim(id);

    dispatch(editClaim(data));
  } catch (error) {
    console.log(error.response);
  }
};
>>>>>>> hajer3

export const deleteClaim = (id) => async (dispatch) => {
  try {
    await api.deleteClaim(id);

    dispatch(deleteClaim(id));
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
      },
      
      addClaim(state,action){
        state.claims.push(action.payload)
    },
    removeClaim(state,action){
        const index = state.claims.findIndex((prod)=> prod._id === action.payload);
        if(index!==-1){
            state.claims.splice(index,1)
        }
    },
    editClaim(state,action){
         const index = state.claims.findIndex((prod)=> prod._id === action.payload._id);
        if(index!==-1){   
            state.claims[index]=action.payload;
        }
    },
  }
  
  });

  export const {getAllClaims,editClaim,removeClaim,addClaim} =claimsSlice.actions
  export default claimsSlice.reducer;
<<<<<<< HEAD

=======
>>>>>>> hajer3
