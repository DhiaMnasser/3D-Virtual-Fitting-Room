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
    console.log(`data createAvatar /actions ${data}`);

    dispatch({ type: "CREATE", payload: data });
  } catch (error) {
    console.log(error.response);
  }
};

export const updateAvatar = (id, avatar) => async dispatch => {
  try {
    const { data } = await api.updateAvatar(id, avatar);
    console.log(`data updateAvatar /actions ${data}`);

    dispatch({ type: "UPDATE", payload: data });
  } catch (error) {
    console.log(error.response);
  }
};


export const deleteAvatar = (id) => async (dispatch) => {
  try {
    await api.deleteAvatar(id);
    console.log(`data deleteAvatar /actions ${data}`);

    dispatch({ type: 'DELETE', payload: id });
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
      }
  }
  
  });

  export const {getAllAvatars} =avatarsSlice.actions
  export default avatarsSlice.reducer;