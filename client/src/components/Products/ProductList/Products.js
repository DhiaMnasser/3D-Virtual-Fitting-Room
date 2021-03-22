import React from "react";
import Product from "../Product/Product";
import { useSelector } from "react-redux";
import { fa, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Products = () => {
  const products = useSelector(state => state.products.products);

  // console.log(products);

  return (
    <>
      <h1>Product list</h1>

      <div class="container justify-content-md-center">
        <div class="row">
          <div class="col-lg-12">
            <div class="shop__cart__table">
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
                    <td class="cart__product__item">
                      <img src={product.image} alt="" />
                      <div class="cart__product__item__title">
                        <h6>{product.productName}</h6>
                        <div class="rating">
                          <i class="fa fa-star"></i>
                          <i class="fa fa-star"></i>
                          <i class="fa fa-star"></i>
                          <i class="fa fa-star"></i>
                          <i class="fa fa-star"></i>
                        </div>
                      </div>
                    </td>
                    <td class="cart__price">{product.price} DT</td>
                    <td class="cart__quantity">
                      <div class="pro-qty">
                        <span class="dec qtybtn">-</span>
                        <input type="text" value={product.Quantity}/>
                        <span class="inc qtybtn">+</span>
                      </div>
                    </td>
                    
                    <td class="cart__close">
                      <span class="icon_close"></span>
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
