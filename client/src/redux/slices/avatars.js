import * as api from "../../api/index";
import { createSlice } from '@reduxjs/toolkit';

export const getAvatars = () => async dispatch => {
  try {
    let { data } = await api.fetchAvatars();
    console.log(`data getAvatars /actions ${data}`);

    dispatch(getAllAvatars(data));
  } catch (error) {
    console.log(error.response);
  }
};

export const createAvatar = avatar => async dispatch => {
  try {
    const data = api.createAvatar(avatar);
   

    dispatch(addAvatar(data));
  } catch (error) {
    console.log(error.response);
  }
};

export const updateAvatar = (id, avatar) => async dispatch => {
  try {
    const { data } = await api.updateAvatar(id, avatar);
    console.log(`data updateAvatar /actions ${data}`);

    dispatch(editAvatar(data));
  } catch (error) {
    console.log(error.response);
  }
};


export const deleteAvatar = (id) => async (dispatch) => {
  try {
    await api.deleteAvatar(id);
    

    dispatch(removeAvatar(id));
  } catch (error) {
    console.log(error.response);
  }
};

export const avatarsSlice = createSlice({
  name:"avatars",
  initialState:{
    avatars:[]
  },
  reducers:{
      getAllAvatars(state,action){
          state.avatars=action.payload;
      },
        addAvatar(state,action){
        state.avatars.push(action.payload)
    },
    removeAvatar(state,action){
        const index = state.avatars.findIndex((prod)=> prod._id === action.payload);
        if(index!==-1){
            state.avatars.splice(index,1)
        }
    },
    editAvatar(state,action){
         const index = state.avatars.findIndex((prod)=> prod._id === action.payload._id);
        if(index!==-1){   
            state.avatars[index]=action.payload;
        }
    },
      
  }
  
  });

  export const {getAllAvatars,editAvatar ,removeAvatar ,addAvatar } =avatarsSlice.actions
  export default avatarsSlice.reducer;