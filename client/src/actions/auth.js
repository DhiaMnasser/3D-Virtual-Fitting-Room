import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';
import { createOrder } from '../redux/slices/orders';

export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });
    data.result.role === 1 ? router.push('/admin') : router.push('/') ;
    
  } catch (error) {
    if (error.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */
      alert(error.response.data.message);

      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
  } else if (error.request) {
      /*
       * The request was made but no response was received, `error.request`
       * is an instance of XMLHttpRequest in the browser and an instance
       * of http.ClientRequest in Node.js
       */
      console.log(error.request);
  } else {
      // Something happened in setting up the request and triggered an Error
      console.log('Error', error.message);
  }
  console.log(error);
  }
};

export const signup = (formData, router) => async (dispatch) => {
  
  let resp;
  api.signUp(formData)
  .then((response) => {
    // Success 🎉
    let data = response.data;
    console.log(response.data.result);
    dispatch(createOrder({"clientId":response.data.result._id}));
    dispatch({ type: AUTH, data });
    router.push('/')
})
.catch((error) => {
    // Error 😨
    if (error.response) {
        /*
         * The request was made and the server responded with a
         * status code that falls out of the range of 2xx
         */
        alert(error.response.data.message);
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    } else if (error.request) {
        /*
         * The request was made but no response was received, `error.request`
         * is an instance of XMLHttpRequest in the browser and an instance
         * of http.ClientRequest in Node.js
         */
        console.log(error.request);
    } else {
        // Something happened in setting up the request and triggered an Error
        console.log('Error', error.message);
    }
    console.log(error.config);
});

  // try {


    
  //   const { data } = await api.signUp(formData).catch((response)=>console.log(response.message)    );

    
    
  //   dispatch(createOrder({"clientId":data.result._id}));
  //   dispatch({ type: AUTH, data });
  //   // router.push('/')
  // } catch (error) {
  //   console.log(JSON.stringify(error));
  // }
};