import React, { useState, useEffect } from "react";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

import "./product.css";
import { deleteProduct, getProductById } from "../../../redux/slices/products";
import { useDispatch } from "react-redux";
import {
  addItemToBasket,
  getCurrentBasket,
  updateOrder
} from "../../../redux/slices/orders";
import { isAuthenticated } from "../../../redux/slices/auth";


function Product(props) {
  const dispatch = useDispatch();
  const [product, setProduct] = useState(JSON.parse(JSON.stringify(props.product)));
  const [user, setUser] = useState(isAuthenticated().result);
  const orders = useSelector(state => state.orders.orders);
  const [currentOrder, setCurrentOrder] = useState();

  useEffect(() => {
    if(currentOrder){
    console.log(`currentOrder in product ${JSON.stringify(currentOrder)}`);
    dispatch(updateOrder(currentOrder._id, currentOrder ));
  }

  }, [currentOrder]);


  const addToBasket = () => {
   try{
      setCurrentOrder(addItemToBasket(orders, product));
      // console.log(`currentOrder in product ${JSON.stringify(currentOrder)}`);

      //  dispatch(updateOrder(currentOrder._id, currentOrder ));
    } catch (error) {
      console.log(error.message);
    }
    //  dispatch(editOrder(state.orders[indexOrder]));
  };

  return (
    <div className={props.class}>
      <div className="product__item">
        <div
          className="product__item__pic set-bg"
          style={{ backgroundImage: `url(${props.product.image[0]})` }}
          data-setbg={props.product.image[0]}
        >
          <div className="label new">New</div>
          <div className="label stockout">out of stock</div>
          <ul className="product__hover">
            <li>
              <a href={props.product.image} className="image-popup">
                <span className="ei ei-arrow_expand"></span>
              </a>
            </li>
            <li>
              <a href="#">
                <span className="ei ei-icon_heart_alt"></span>
              </a>
            </li>
            <li>
              <a onClick={() => addToBasket()}>
                <span className="ei ei-icon_bag_alt"></span>
              </a>
            </li>
          </ul>
        </div>
        <div className="product__item__text">
          <h6 onClick={()=>{
            localStorage.removeItem("selectedProduct");
            localStorage.setItem("selectedProduct",JSON.stringify(props.product));
          }}
        >
            <Link
              to={{
                pathname: "/productDetails/" + props.product._id,
                product: props.product
              }}

            >
            {props.product.productName}

            </Link>
          </h6>
          <div className="rating">
            {props.stars >= 1 && (
              <FontAwesomeIcon
                style={{ color: `#e3c01c`, fontSize: `10px` }}
                icon={faStar}
              />
            )}
            {props.stars >= 2 && (
              <FontAwesomeIcon
                style={{ color: `#e3c01c`, fontSize: `10px` }}
                icon={faStar}
              />
            )}
            {props.stars >= 3 && (
              <FontAwesomeIcon
                style={{ color: `#e3c01c`, fontSize: `10px` }}
                icon={faStar}
              />
            )}
            {props.stars >= 4 && (
              <FontAwesomeIcon
                style={{ color: `#e3c01c`, fontSize: `10px` }}
                icon={faStar}
              />
            )}
            {props.stars >= 5 && (
              <FontAwesomeIcon
                style={{ color: `#e3c01c`, fontSize: `10px` }}
                icon={faStar}
              />
            )}
          </div>
          {props.product.promo===0 && <div className="product__price">${props.product.price}</div>}

{props.product.promo===0 || <div className="product__price">{props.product.price-(props.product.price*props.product.promo)/100}<span>{props.product.price}</span></div>}
 <div className="product__price">{props.product.color} </div>
<div className="product__price"> {props.product.size}</div>
        </div>
        
      </div>
      
      <script></script>
    </div>
  );
}

export default Product;
