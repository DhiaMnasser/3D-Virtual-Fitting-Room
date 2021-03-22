import React, { useEffect } from "react";
import Product from "../Product/Product";
import { useSelector, useDispatch } from "react-redux";
import { getProducts, createProduct, updateProduct, deleteProduct } from '../../../redux/slices/products';


const Products = () => {
  
  const products = useSelector((state) => state.products.products)
console.log(JSON.stringify(useSelector((state) => state), null, 4));

  return (
    <>
      <h1>Product grid</h1>
      <div class="col-lg-9 col-md-9">
        <div class="row">
        {products.map((product)=>( 
           <Product product={product}/> 

         ))}
          
        </div>
      </div>

    </>
  );
};

export default Products;
