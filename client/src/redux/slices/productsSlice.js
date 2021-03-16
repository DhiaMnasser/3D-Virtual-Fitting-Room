import { createSlice } from '@reduxjs/toolkit';
import {queryApi} from '../../utils/queryApi'
export const productsSlice = createSlice({
name:"products",
initialState:{
    products:[]

},
reducers:{
    getAllProducts(state,action){
        state.products=action.payload;
    }
}
});
export const fetchProducts = () => async(dispatch) =>{
    const[res,error]= await queryApi("products");
    if(error){
        console.log(error);
    }else{
        console.log("yo")
dispatch(getAllProducts(res))
    }

}
export const {getAllProducts} =productsSlice.actions
export default productsSlice.reducer;