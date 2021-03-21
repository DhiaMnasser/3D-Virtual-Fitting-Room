import * as api from "../api/index";

export const getCategories = () => async dispatch => {
  try {
    let { data } = await api.fetchCategories();
    console.log(`data Categories /actions ${data}`);

    dispatch({ type: "FETCH_ALL", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createCategory = category => async dispatch => {
  try {
    const data = api.createCategory(category);
    console.log(`product create project /actions ${JSON.stringify(category)}`);
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

export const updateCategory = (id, category) => async dispatch => {
  try {
    const { data } = await api.updateCategory(id, category);

    dispatch({ type: "UPDATE", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};


export const deleteCategory = (id) => async (dispatch) => {
  try {
    await api.deleteCategory(id);

    dispatch({ type: 'DELETE', payload: id });
  } catch (error) {
    console.log(error.message);
  }
};
