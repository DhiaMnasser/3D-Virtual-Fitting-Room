import * as api from "../../api/index";
import { createSlice } from '@reduxjs/toolkit';


export const getMessage = () => async dispatch => {
  try {
    const { data } = await api.fetchMessages();

    // dispatch({ type: "FETCH_ALL", payload: data });
    dispatch(getAllMessages(data));
  } catch (error) {
    console.log(error.response);
  }
};


export const searchMessage = (search) => async dispatch => {
  try {
    const { data } = await api.fetchMessages();
const datas = data.filter((msg)=> msg.name.includes(search))
    // dispatch({ type: "FETCH_ALL", payload: data });
    dispatch(getAllMessages(datas));

  } catch (error) {
    console.log(error.response);
  }
};



export const createMessage = Message => async dispatch => {
    try {
      const data = await api.createMessage(Message);
      
      dispatch(addMessage(data.data));
    } catch (error) {
      console.log(error.response);
    }
  };
  
  export const updateMessage = (id, Message) => async dispatch => {
    try {
      const { data } = await api.updateMessage(id, Message);
  
      dispatch(editMessage(data.data));
    } catch (error) {
      console.log(error.response);
    }
  };
  
  
  export const deleteMessage = (id) => async (dispatch) => {
   
      await api.deleteMessage(id);
  
      dispatch(removeMessage(id));
   
  };
  
  export const MessagesSlice = createSlice({
    name:"Messages",
    initialState:{
        Messages:[]
    
    },
    reducers:{
        getAllMessages(state,action){
            state.Messages=action.payload;
            // console.log("in slice"+ JSON.stringify(state.Messages, null, 4));   
        },
          addMessage(state,action){
          state.Messages.push(action.payload)
      },
      removeMessage(state,action){
          const index = state.Messages.findIndex((prod)=> prod._id === action.payload);
          if(index!==-1){
              state.Messages.splice(index,1)
          }
      },
      editMessage(state,action){
           const index = state.Messages.findIndex((prod)=> prod._id === action.payload._id);
          if(index!==-1){   
              state.Messages[index]=action.payload;
          }
      }
    }
    });
  export const {getAllMessages, editMessage,removeMessage,addMessage,filterMessageByCategory} =MessagesSlice.actions
  export default MessagesSlice.reducer;