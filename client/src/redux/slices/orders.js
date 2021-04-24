
import * as api from "../../api/index";
import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from "react-redux";
import { useState } from "react";
import { isAuthenticated } from "./auth";


export const getOrders = () => async dispatch => {
  try {
    let { data } = await api.fetchOrders();
    console.log(`data getOrders /actions ${data}`);

    dispatch(getAllOrders(data));
  } catch (error) {
    console.log(error.response);
  }
};

export const getOrdersByUser = () => async dispatch => {
  try {
    let { data } = await api.fetchOrderByUser(isAuthenticated()?.result?._id);
    console.log(`data getOrders /actions ${data}`);

    dispatch(getAllOrders(data));
  } catch (error) {
    console.log(error.response);
  }
};

export const createOrder = Client => async dispatch => {
  try {
    const data = api.createOrder(Client);
    
    dispatch(addOrder(data));
  } catch (error) {
    console.log(error.response);
  }
};

export const updateOrder = (id, order) => async dispatch => {
  console.log('updateOrder called');
  try {
    console.log('updating order');
    
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

export const removeItemFromBasket = (currentOrder, product) => {
  try {
    const indexProduct = currentOrder.products.findIndex(
      prod => prod._id === product._id
    );
    currentOrder.totalPrice -= currentOrder.products[indexProduct].price * currentOrder.products[indexProduct].stockQuantity;
    currentOrder.products.splice(indexProduct,1)
      return currentOrder;
    }catch(error){
console.log(error);

    }
}

export const addItemToBasket = (orders, product) => {

  // console.log("addItemToBasket called");
  
  const currentOrder = JSON.parse(JSON.stringify(getCurrentBasket(orders)));
  // console.log(`currentOrder in slices: ${JSON.stringify(currentOrder)}`);
  
  try {


    const indexProduct = currentOrder.products.findIndex(
      prod => prod._id === product._id
    );
    // console.log("indexProduct" + indexProduct);

    // const indexProduct = state.orders[indexOrder].products.findIndex((prod)=> prod._id === action.payload._id);
    if (indexProduct !== -1) {
      currentOrder.products[indexProduct].stockQuantity++;
      // console.log("indexProduct" + currentOrder.products[indexProduct].stockQuantity);
    } else {
      product.stockQuantity=1;
      
      currentOrder.products.push(product) ;
    }
    // console.log("Product Order pushed" + JSON.stringify(currentOrder));
    currentOrder.totalPrice = currentOrder.totalPrice + product.price;
    
    return (currentOrder);
    //  dispatch(updateOrder(currentOrder._id, currentOrder ));
  } catch (error) {
    console.log(error.message);
  }
  //  dispatch(editOrder(state.orders[indexOrder]));
};

export const getCurrentBasket = (orders) => {
  
  const connectedUser = isAuthenticated().result;
  // console.log("getCurrentBasket Orders" + JSON.stringify(orders));

  const indexOrder = orders?.findIndex((order)=> !order.isValid && order.clientId === connectedUser?._id);
  
  if(indexOrder!==-1){ 
    return orders[indexOrder] ;
  }
  return  null;
  
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
        //  console.log(`editOrder in slices : ${state.orders}`);
         
        if(index!==-1){   
            // let orders = JSON.parse(JSON.stringify(state.orders))
            state.orders[index]=action.payload;
            // alert("Product Added To Basket");
            // state.orders = orders;
        }
    },

  }
  });

  export const {getAllOrders,addOrder,removeOrder,editOrder} = ordersSlice.actions
  export default ordersSlice.reducer;