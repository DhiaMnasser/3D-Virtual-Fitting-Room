import React, { useEffect } from "react";
import Product from "../Product/Product";
import { useSelector, useDispatch } from "react-redux";
import { getProducts, createProduct, updateProduct, deleteProduct } from '../../../redux/slices/products';


const Products = () => {
  
const products = useSelector((state) => state.products.products)
console.log(JSON.stringify(useSelector((state) => state), null, 4));

  return (
    <>
      
      <div class="col-lg-9 col-md-9">
        <div class="row">
        {products.map((product)=>{ 
           return<Product key={product._id} product={product} class="col-lg-3 col-md-4 col-sm-6 mix cosmetic" stars="5"/> 

        })}
          
        </div>
      </div>

    </>
  );
};

export default Products;
