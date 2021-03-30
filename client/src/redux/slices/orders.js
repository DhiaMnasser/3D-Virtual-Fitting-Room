import * as api from "../../api/index";
import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from "react-redux";
import { useState } from "react";

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


// export const addItemToBasket = (product) => async dispatch => {
//   try {
//     // const { data } = await api.updateOrder(id, order);
//     product = { ...product, stockQuantity : 99};
//     console.log(`product qte ${product.stockQuantity}`);
    
//     dispatch(addItemToOrder(product));
//   } catch (error) {
//     console.log(error);
//   }
// };

export const addItemToCart = ({ product: product, state }) => async dispatch => {
  try{
  // const indexOrder = useSelector((state) => state.orders.findIndex((order)=> !order.isValid && order.clientId === JSON.parse(localStorage.getItem('profile')).result._id ));
  
  const indexOrder = state.orders.findIndex((order)=> !order.isValid && order.clientId === JSON.parse(localStorage.getItem('profile')).result._id );
  // const indexOrder = state.orders.findIndex((order)=> order.clientId === "605e25bdd6c4bd30e8ceebcc");
  console.log("indexOrder"+indexOrder);
  
  const indexProduct = useSelector((state) => state.orders[indexOrder].products.findIndex((prod)=> prod._id === product._id));
   
  // const indexProduct = state.orders[indexOrder].products.findIndex((prod)=> prod._id === action.payload._id);
    if(indexProduct!==-1){   
    useSelector((state) =>  state.orders[indexOrder].products[indexProduct].stockQuantity++);
       console.log("indexProduct"+indexProduct);
       
     
   }else{
    useSelector((state) => state.orders[indexOrder].products.push(product));
     
   }
  } catch(error){
    console.log(error.message);
  }
  //  dispatch(editOrder(state.orders[indexOrder]));
   
};

export const getCurrentBasket = () => async dispatch => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const indexOrder = useSelector((state) => state.orders.findIndex((order)=> order.clientId === user.result._id));
  console.log("getting basket");

    if(indexOrder!==-1){   
      console.log("get basket"+useSelector((state) =>state.orders[indexOrder]));
    }
  console.log("fail");
  //  null;
   
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
        const index = state.orders.findIndex((order)=> order._id === action.payload);
        if(index!==-1){
            state.orders.splice(index,1)
        }
    },
    editOrder(state,action){
         const index = state.orders.findIndex((order)=> order._id === action.payload._id);
        if(index!==-1){   
            state.orders[index]=action.payload;
        }
    },

  }
  });

  export const {getAllOrders,addOrder,removeOrder,editOrder} =ordersSlice.actions
  export default ordersSlice.reducer;