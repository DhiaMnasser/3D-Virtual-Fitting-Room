import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';
import { addOrder } from '../redux/slices/orders';
import axios from 'axios';

export const passwordResetHashCreated = () => ({ type: 'AUTHENTICATION_PASSWORD_RESET_HASH_CREATED' });
export const passwordResetClear = () => ({ type: 'AUTHENTICATION_PASSWORD_RESET_CLEAR' });
export const passwordResetHashFailure = error => ({ type: 'AUTHENTICATION_PASSWORD_RESET_HASH_FAILURE', error });

export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });
    data.result.role === 1 ? router.push('/admin') : router.push('/') ;
    
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
    // data.result.role === 1 ? router.push('/') : router.push('/admin') ;
    router.push('/')
  } catch (error) {
    console.log(error);
  }
};
export function createHash(email) {
  return async (dispatch) => {
    // contact the API
    await fetch(
      // where to contact
      '/api/authentication/saveresethash',
      // what to send
      {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
      },
    )
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      return null;
    })
    .then((json) => {
      if (json.username) {
        return dispatch(passwordResetHashCreated(json));
      }
      return dispatch(passwordResetHashFailure(new Error('Something went wrong. Please try again.')));
    })
    .catch(error => dispatch(passwordResetHashFailure(error)));
  };
}

export const reset = ({ password, token }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify({ password, token });
  try {
    const res = await axios.put(
      `http://localhost:3000/api/auth/reset/${token}`,
      body,
      config
    );
    dispatch({
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(alert(error.msg, 'danger')));
    }
  }
};

