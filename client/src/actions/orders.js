import * as api from "../api/index";

export const getProducts = () => async dispatch => {
  try {
    let { data } = await api.fetchProducts();
    console.log(`data getProducts /actions ${data}`);

    dispatch({ type: "FETCH_ALL", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createProduct = product => async dispatch => {
  try {
    const data = api.createProduct(product);
    console.log(`product create project /actions ${JSON.stringify(product)}`);
    console.log(
      `data create project /actions ${JSON.stringify(
        JSON.stringify(data, null, 4)
      )}`
    );
    dispatch({ type: "CREATE", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = (id, product) => async dispatch => {
  try {
    const { data } = await api.updateProduct(id, product);

    dispatch({ type: "UPDATE", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};


export const deleteProduct = (id) => async (dispatch) => {
  try {
    await api.deleteProduct(id);

    dispatch({ type: 'DELETE', payload: id });
  } catch (error) {
    console.log(error.message);
  }
};
