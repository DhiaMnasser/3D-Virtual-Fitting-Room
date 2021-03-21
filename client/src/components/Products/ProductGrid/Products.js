import React, { useEffect } from "react";
import Product from "../Product/Product";
import { useSelector, useDispatch } from "react-redux";
import { getProducts, createProduct, updateProduct, deleteProduct } from '../../../actions/products';


const Products = () => {

  useSelector((state) => console.log("state in prodgrid "+ JSON.stringify(state, null, 4)));
  const products = useSelector((state) => state.products)
  // const dispatch = useDispatch();


  
 

  // console.log(products);

  return (
    <>
      <h1>Product grid</h1>
      <div class="col-lg-9 col-md-9">
        <div class="row">
        {/* {products.map((product)=>( */}
          {/* <Product product={product}/> */}

        {/* ))} */}
          
        </div>
      </div>

    </>
  );
};

export default Products;
