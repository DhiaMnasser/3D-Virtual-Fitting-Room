import React, { useState } from "react";
import Product from "../Product/Product";
import { useSelector } from "react-redux";
import { fa, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddProductForm from '../../Forms/ProductForm/AddProduct/AddProductForm';
import { Button } from "@material-ui/core";

const Products = () => {
  const products = useSelector((state) => state.products.products)
  const [addProduct, setaddProduct] = useState(false);
  // console.log(products);

  return (
    <>
    <button className=" primary-btn"  onClick={()=>setaddProduct(!addProduct)}>Add Product</button>
    {addProduct &&( 

      <AddProductForm/>
    )}

      <h1>Product list</h1>
      <div className="container justify-content-md-center">
        <div className="row">
          <div className="col-lg-12">
            <div className="shop__cart__table">
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                {products.map((product)=>(
                  <tr>
                    <td className="cart__product__item">
                      <img src={product._id} alt="" />
                      <div className="cart__product__item__title">
                        <h6>{product.productName}</h6>
                        <div className="rating">
                          {product.rating}
                        </div>
                      </div>
                    </td>
                    <td className="cart__price">{product.price} DT</td>
                    <td className="cart__quantity">
                      <div className="pro-qty">
                        <span className="dec qtybtn">-</span>
                        <input type="text" value={product.Quantity}/>
                        <span className="inc qtybtn">+</span>
                      </div>
                    </td>
                    
                    <td className="cart__close">
                      <span className="icon_close"></span>
                    </td>

                  </tr>
                  ))}

                  
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
