import { AUTH } from '../../constants/actionTypes';
import * as api from "../../api/index";
import { createSlice } from '@reduxjs/toolkit';
export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    router.push('/');
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    router.push('/');
  } catch (error) {
    console.log(error);
  }
};
export const getUsers = () => async dispatch => {
  try {
    let { data } = await api.fetchUsers();
    console.log(`data getUsers /actions ${data}`);

    dispatch(getAllUsers(data));
  } catch (error) {
    console.log(error.response);
  }
};

<<<<<<< HEAD
=======


>>>>>>> hajer3
export const isAuthenticated = () => {
  if (typeof window == 'undefined') return false;
  if (localStorage.getItem('profile')) {
    return JSON.parse(localStorage.getItem('profile'));
  } else {
    return false;
  }
};
<<<<<<< HEAD

=======
export const updateUser = (id, user) => async dispatch => {
  try {
    const { data } = await api.updateUser(id, user);

    dispatch(editUser(data));
  } catch (error) {
    console.log(error.response);
  }
};
>>>>>>> hajer3
export const usersSlice = createSlice({
  name:"users",
  initialState:{
      users:[]
  
  },
  reducers:{
      getAllUsers(state,action){
          state.users=action.payload;
<<<<<<< HEAD
          // console.log("in slice"+ JSON.stringify(state.users, null, 4));   
=======
           console.log("in slice"+ JSON.stringify(state.users, null, 4));   
>>>>>>> hajer3
      },
        addUser(state,action){
        state.users.push(action.payload)
    },
    removeUser(state,action){
        const index = state.users.findIndex((prod)=> prod._id === action.payload);
        if(index!==-1){
            state.users.splice(index,1)
        }
    },
    editUser(state,action){
         const index = state.users.findIndex((prod)=> prod._id === action.payload._id);
        if(index!==-1){   
            state.users[index]=action.payload;
        }
    },
  }
  });
  
  export const {getAllUsers, editUser,removeUser,addUser} =usersSlice.actions
  export default usersSlice.reducer;