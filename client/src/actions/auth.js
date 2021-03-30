import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';
import { addOrder } from '../redux/slices/orders';

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
    console.log("data signup" + JSON.stringify(data));
    // const { order } = await api.createOrder(...data.result._id);
    
    dispatch({ type: AUTH, data });
    // dispatch(addOrder({clientId: data.result._id}));
    // dispatch(addOrder(order));
    
    router.push('/');
  } catch (error) {
    console.log(error);
  }
};