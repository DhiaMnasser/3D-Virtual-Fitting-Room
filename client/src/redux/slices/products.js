import * as api from "../../api/index";
import { createSlice } from "@reduxjs/toolkit";

export const getProducts = () => async dispatch => {
  try {
    const { data } = await api.fetchProducts();

    // dispatch({ type: "FETCH_ALL", payload: data });
    dispatch(getAllProducts(data));
  } catch (error) {
    console.log(error.response);
  }
};

export const getTopProducts = () => async dispatch => {
  try {
    const { data } = await api.fetchTopProducts();

    // dispatch({ type: "FETCH_ALL", payload: data });
    dispatch(getBestProducts(data));
  } catch (error) {
    console.log(error.response);
  }
};
//page={ "page": 1,"pagination":1,filter,"recherche"=string}
export const get9Products = page => async dispatch => {
  try {
    const { data } = await api.smartFetchProduct(page);

    // dispatch({ type: "FETCH_ALL", payload: data });
    dispatch(getAllProducts(data.products));
  } catch (error) {
    console.log(error.response);
  }
};

export const getNbPage = () => async dispatch => {
  try {
    const { data } = await api.getNbPages();

    // dispatch({ type: "FETCH_ALL", payload: data });
    dispatch(getNb(data.cnt));
  } catch (error) {
    console.log(error.response);
  }
};
export const filterProducts = cat => async dispatch => {
  try {
    const { data } = await api.fetchProducts();
    const datas = data.filter(prod => prod.categoryId === cat);
    // dispatch({ type: "FETCH_ALL", payload: data });
    dispatch(getAllProducts(datas));
  } catch (error) {
    console.log(error.response);
  }
};
export const searchProducts = search => async dispatch => {
  try {
    const { data } = await api.fetchProducts();
    const datas = data.filter(
      prod =>
        prod.productName.includes(search) ||
        prod.description.includes(search) ||
        prod.categoryId.includes(search)
    );
    // dispatch({ type: "FETCH_ALL", payload: data });
    dispatch(getAllProducts(datas));
  } catch (error) {
    console.log(error.response);
  }
};
export const filterProductsBySize = tailles => async dispatch => {
  try {
    let datas = [];
    const { data } = await api.fetchProducts();
    tailles.forEach(taille => {
      datas = [...datas, ...data.filter(prod => prod.size === taille)];
    });

    // dispatch({ type: "FETCH_ALL", payload: data });
    dispatch(getAllProducts(datas));
  } catch (error) {
    console.log(error.response);
  }
};

export const createProduct = product => async dispatch => {
  try {
    const data = await api.createProduct(product);

    dispatch(addProduct(data.data));
  } catch (error) {
    console.log(error.response);
  }
};

export const updateProduct = (id, product) => async dispatch => {
  try {
    const { data } = await api.updateProduct(id, product);

    dispatch(editProduct(data.data));
  } catch (error) {
    console.log(error.response);
  }
};

export const deleteProduct = id => async dispatch => {
  await api.deleteProduct(id);

  dispatch(removeProduct(id));
};

export const listProductsByRecommendations = (_data) => async dispatch => {
  try {
    // dispatch({ type: PRODUCT_LIST_RECOMMENDATIONS_REQUEST });

    const { data } = await api.getRecommendation(_data);
    dispatch(editRecommendations(data));
  } catch (error) {
    console.log(error.response);
  }
};

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    nbpg: 0
  },
  reducers: {
    getAllProducts(state, action) {
      state.products = action.payload;
      // console.log("in slice"+ JSON.stringify(state.products, null, 4));
    },
    addProduct(state, action) {
      state.products.push(action.payload);
    },
    removeProduct(state, action) {
      const index = state.products.findIndex(
        prod => prod._id === action.payload
      );
      if (index !== -1) {
        state.products.splice(index, 1);
      }
    },
    editProduct(state, action) {
      const index = state.products.findIndex(
        prod => prod._id === action.payload._id
      );
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    getNb(state, action) {
      state.nbpg = action.payload;
      // console.log("in slice"+ JSON.stringify(state.products, null, 4));
    },
    editRecommendations(state, action) {
      state.productKNNRecommended = action.payload;
    },
    getBestProducts(state, action) {
      state.topProducts = action.payload;
    }
    
  }
});

export const {
  getAllProducts,
  editProduct,
  removeProduct,
  addProduct,
  filterProductByCategory,
  getNb,
  editRecommendations,
  getBestProducts
} = productsSlice.actions;
export default productsSlice.reducer;
