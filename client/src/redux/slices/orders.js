import * as api from "../../api/index";
import { createSlice } from '@reduxjs/toolkit';

export const getOrders = () => async dispatch => {
  try {
    let { data } = await api.fetchOrders();
    console.log(`data getOrders /actions ${data}`);

    dispatch(getAllOrders(data));
  } catch (error) {
    console.log(error.response);
  }
};

export const createOrder = order => async dispatch => {
  try {
    const data = api.createOrder(order);
    
    dispatch(addOrder(data));
  } catch (error) {
    console.log(error.response);
  }
};

export const updateOrder = (id, order) => async dispatch => {
  try {
    const { data } = await api.updateOrder(id, order);

    dispatch(editOrder(data));
  } catch (error) {
    console.log(error.response);
  }
};


export const deleteOrder = (id) => async (dispatch) => {
  try {
    await api.deleteOrder(id);

    dispatch(removeOrder(id));
  } catch (error) {
    console.log(error.response);
  }
};

export const ordersSlice = createSlice({
  name:"orders",
  initialState:{
      orders:[]
  
  },
  reducers:{
      getAllOrders(state,action){
          state.orders=action.payload;
          // console.log("in slice"+ JSON.stringify(state.orders, null, 4));   
      },
      
      addOrder(state,action){
        state.orders.push(action.payload)
    },
    removeOrder(state,action){
        const index = state.orders.findIndex((prod)=> prod._id === action.payload);
        if(index!==-1){
            state.orders.splice(index,1)
        }
    },
    editOrder(state,action){
         const index = state.orders.findIndex((prod)=> prod._id === action.payload._id);
        if(index!==-1){   
            state.orders[index]=action.payload;
        }
    },
  }
  });

  export const {getAllOrders,addOrder,removeOrder,editOrder} =ordersSlice.actions
  export default ordersSlice.reducer;


