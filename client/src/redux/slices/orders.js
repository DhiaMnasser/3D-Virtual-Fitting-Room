import * as api from "../../api/index";

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
    console.log(`order create project /actions ${JSON.stringify(order)}`);
    console.log(
      `data create project /actions ${JSON.stringify(
        JSON.stringify(data, null, 4)
      )}`
    );
    dispatch({ type: "CREATE", payload: data });
  } catch (error) {
    console.log(error.response);
  }
};

export const updateOrder = (id, order) => async dispatch => {
  try {
    const { data } = await api.updateOrder(id, order);

    dispatch({ type: "UPDATE", payload: data });
  } catch (error) {
    console.log(error.response);
  }
};


export const deleteOrder = (id) => async (dispatch) => {
  try {
    await api.deleteOrder(id);

    dispatch({ type: 'DELETE', payload: id });
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
      }
  }
  });

  export const {getAllOrders} =ordersSlice.actions
  export default ordersSlice.reducer;


