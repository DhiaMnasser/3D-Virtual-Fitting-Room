import React, { useEffect, useState, useRef } from "react";
// import './Basket.css';
// import {Container} from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faStar } from "@fortawesome/free-solid-svg-icons";
import {
  getCurrentBasket,
  getOrdersByUser,
  addItemToBasket,
  removeItemFromBasket,
  updateOrder
} from "../../../redux/slices/orders";
import * as api from '../../../api/index';

import { useSelector, useDispatch } from "react-redux";
import Product from "../../Products/Product/Product";
import { isAuthenticated } from "../../../redux/slices/auth";
// import { Link } from "react-router-dom";


import { Link, useHistory, useLocation } from "react-router-dom";

// import { Link } from 'react-router-dom';
import Stripe from "../../Stripe/Stripe";


// import logo from './logo.png'
function Basket() {
  const dispatch = useDispatch();
  const history = useHistory();


  const [connectedUser, setConnectedUser] = useState(isAuthenticated()?.result);

  let orders = useSelector(state => state.orders.orders);
  let [currentOrder, setCurrentOrder] = useState(getCurrentBasket(orders));
  let [productsFromBD, setProductsFromBD] = useState([]);
  let products = currentOrder?.products;
  let isChanged = false;
  const refCurrentOrder = useRef();
  const refIsChanged = useRef();


  useEffect(() => {
    console.log("Basket mounted");
    console.log(orders);
    console.log("currentOrder");
    console.log(currentOrder);
    if (currentOrder) {
      console.log("currentOrder in if");
      console.log(currentOrder);
      // getProductsFromBD();
    }

    return () => {
      // console.log(`currentOrder in useEffect ${JSON.stringify(currentOrder)}`);
      if (refIsChanged.current) {
        dispatch(
          updateOrder(refCurrentOrder.current?._id, refCurrentOrder.current)
        );
      }
    };
  }, []);

  useEffect(() => {
    console.log("useEffect orders");
    setCurrentOrder(getCurrentBasket(orders));
    getProductsFromBD();
  }, [orders]);

  useEffect(() => {
    console.log("currentOrder changed");
    console.log(currentOrder);
  }, [currentOrder]);

  useEffect(() => {
    console.log("changed isChanged");
    console.log(isChanged);
  }, [isChanged]);

  const updateCurrentOrder = currOrder => {
    setCurrentOrder(currentOrder => {
      currentOrder = currOrder;
      refCurrentOrder.current = currentOrder;
      refIsChanged.current = true;
      return currentOrder;
    });

    // setCurrentOrder(currOrder);
  };

  const getProductsFromBD = () => {
    let productsarray = JSON.parse(JSON.stringify(productsFromBD));
    console.log("getProductsFromBD called");
    console.log('products');
    console.log(products);
    products?.map(prod => {
      api.fetchProductById(prod._id).
      then((response)=>{
        let index = productsarray?.findIndex((p)=>p._id===response._id);
         if(index===-1){
           productsarray.push(response.data);
           console.log("prodArr useEffect in map");
           console.log(productsarray);
           // console.log("productsarray.findIndex(response)");
           // console.log(productsarray.findIndex(response));
           setProductsFromBD(productsarray);
          }
        
      })
    });
    // console.log("productsarray useEffect out of map");
    // console.log(productsarray);
  };

  useEffect(()=>{
    console.log("productsFromBD useEffect");
    console.log(productsFromBD);

  },[productsFromBD])

  const redirectToCheckout = () =>{
    console.log('redirectToCheckout called');
    let redirect = true;
    products?.forEach((p,index)=>{

     if (productsFromBD[index].stockQuantity < p.stockQuantity){
       alert(`only ${productsFromBD[index].stockQuantity} pieces are available for ${productsFromBD[index].productName}`)
       redirect = false;
     }

    })

    if(redirect){
      history.push("/checkout");
    }

  }

  const incQuantity = prod => {
    console.log("incQuantity called");
    const product = JSON.parse(JSON.stringify(prod));
    const currOrder = JSON.parse(JSON.stringify(currentOrder));
    try {
      const indexProduct = currOrder.products.findIndex(
        p => p._id === product._id
      );
      currOrder.products[indexProduct].stockQuantity++;
      currOrder.totalPrice = currOrder.totalPrice + product.price;
      console.log(currOrder.products[indexProduct].stockQuantity);
      updateCurrentOrder(currOrder);
    } catch (error) {
      console.log(error);
    }
  };

  const decQuantity = prod => {
    console.log("decQuantity called");
    const product = JSON.parse(JSON.stringify(prod));
    const currOrder = JSON.parse(JSON.stringify(currentOrder));

    try {
      //   product.stockQuantity--;
      const indexProduct = currOrder.products.findIndex(
        p => p._id === product._id
      );
      if (product.stockQuantity > 1) {
        currOrder.products[indexProduct].stockQuantity--;
        currOrder.totalPrice = currOrder.totalPrice - product.price;
        console.log(currOrder.products[indexProduct].stockQuantity);
        updateCurrentOrder(currOrder);
      } else {
        alert("quantity cant go below 1");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeItem = prod => {
    const product = JSON.parse(JSON.stringify(prod));
    const currOrder = JSON.parse(JSON.stringify(currentOrder));

    console.log("removeItem called");

    try {
      const indexProduct = currOrder.products.findIndex(
        prod => prod._id === product._id
      );
      currOrder.totalPrice -=
        currOrder.products[indexProduct].price *
        currOrder.products[indexProduct].stockQuantity;
      currOrder.products.splice(indexProduct, 1);
      updateCurrentOrder(currOrder);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section class="shop-cart spad">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="shop__cart__table">
                <table>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {products?.map(product => (
                      <tr>
                        <td class="cart__product__item">
                          <img src={product.image} alt={product.description} />
                          <div class="cart__product__item__title">
                            <h6>{product.productName}</h6>
                            <div class="rating">
                              <FontAwesomeIcon
                                style={{ color: `#e3c01c`, fontSize: `10px` }}
                                icon={faStar}
                              />
                              <FontAwesomeIcon
                                style={{ color: `#e3c01c`, fontSize: `10px` }}
                                icon={faStar}
                              />
                              <FontAwesomeIcon
                                style={{ color: `#e3c01c`, fontSize: `10px` }}
                                icon={faStar}
                              />
                              <FontAwesomeIcon
                                style={{ color: `#e3c01c`, fontSize: `10px` }}
                                icon={faStar}
                              />
                              <FontAwesomeIcon
                                style={{ color: `#e3c01c`, fontSize: `10px` }}
                                icon={faStar}
                              />
                            </div>
                          </div>
                        </td>
                        <td class="cart__price">{product.price} DT</td>
                        <td class="cart__quantity">
                          <div class="pro-qty">
                            <span
                              class="dec qtybtn"
                              onClick={() => {
                                decQuantity(product);
                              }}
                            >
                              -
                            </span>
                            <input type="text" value={product.stockQuantity} />
                            <span
                              class="inc qtybtn"
                              onClick={() => {
                                incQuantity(product);
                              }}
                            >
                              +
                            </span>
                          </div>
                        </td>
                        <td class="cart__total">
                          {product.price * product.stockQuantity} DT
                        </td>
                        <td class="cart__close">
                          <span
                            class="icon_close"
                            onClick={() => {
                              removeItem(product);
                            }}
                          ></span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-6 col-md-6 col-sm-6">
              <div class="cart__btn">
                <Link to="/shop">Continue Shopping</Link>
              </div>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-6">
              <div class="cart__btn update__btn">
              <Link to="/myOrders">My Orders</Link>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-6">
              <div class="discount__content">
                <h6>Discount codes</h6>
                <form action="#">
                  <input type="text" placeholder="Enter your coupon code" />
                  <button type="submit" class="site-btn">
                    Apply
                  </button>
                </form>
              </div>
            </div>
            <div class="col-lg-4 offset-lg-2">
              <div class="cart__total__procced">
                <h6>Basket total</h6>
                <ul>
                  <li>
                    Total <span>{currentOrder?.totalPrice} DT</span>
                  </li>
                </ul>
                <span class="primary-btn" onClick={()=>{redirectToCheckout()}}>
                  Proceed to checkout
                </span>
                <Link></Link>
                <Stripe name="yoyo" price={currentOrder?.totalPrice}></Stripe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Basket;
