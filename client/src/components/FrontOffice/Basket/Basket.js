import React, { useEffect, useState } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import Product from "../../Products/Product/Product";
import { isAuthenticated } from "../../../redux/slices/auth";
import { Link } from 'react-router-dom';
import Stripe from "../../Stripe/Stripe";


// import logo from './logo.png'
function Basket() {
  const dispatch = useDispatch();

  const [connectedUser, setConnectedUser] = useState(isAuthenticated()?.result);

  let orders = useSelector(state => state.orders.orders);
  let [currentOrder, setCurrentOrder] = useState(getCurrentBasket(orders));
  let products = currentOrder?.products;

  //   useEffect(() => {

  //     currentOrder= getCurrentBasket(orders);
  //     products = currentOrder?.products;

  //   },[dispatch]);

  // console.log(`orders Basket: ${orders}`);

  // let currentOrder= getCurrentBasket(orders);
  // console.log(`currentOrder Basket: ${currentOrder}`);

  // let products = currentOrder?.products;
  // console.log(`products Basket: ${products}`);

  useEffect(() => {


    // updateOrder(currentOrder._id , currentOrder);

      setCurrentOrder(getCurrentBasket(orders));
    return ()=>{
    console.log('useEffect called');
    console.log(`currentOrder in useEffect ${JSON.stringify(currentOrder)}`);
    dispatch(updateOrder(currentOrder?._id, currentOrder));

    }

  },[currentOrder] );



  const incQuantity = (prod) => {
    console.log('incQuantity called');

    const product = JSON.parse(JSON.stringify(prod));
    const currOrder = JSON.parse(JSON.stringify(currentOrder));
    try {
    //   product.stockQuantity++;
      console.log(product.stockQuantity);
      const indexProduct = currOrder.products.findIndex(
        p => p._id === product._id
      );
      currOrder.products[indexProduct].stockQuantity++;
      currOrder.totalPrice = currOrder.totalPrice + product.price;
      setCurrentOrder(currOrder);
    console.log(`currentOrder in incQuantity ${JSON.stringify(currentOrder)}`);

    // dispatch(updateOrder(currOrder._id, currOrder));

    } catch (error) {
      console.log(error);
    }
  };

  const decQuantity = (prod) => {
    const product = JSON.parse(JSON.stringify(prod));
    const currOrder = JSON.parse(JSON.stringify(currentOrder));

    console.log('decQuantity called');

    try {
    //   product.stockQuantity--;
      const indexProduct = currOrder.products.findIndex(
        p => p._id === product._id
      );
      if (product > 1) {
        currOrder.products[indexProduct].stockQuantity--;
        currOrder.totalPrice = currOrder.totalPrice - product.price;
        setCurrentOrder(currOrder);
        console.log(product.stockQuantity);
      } else {
        alert("quantity cant go below 1");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeItem = (prod) => {
    const product = JSON.parse(JSON.stringify(prod));
    const currOrder = JSON.parse(JSON.stringify(currentOrder));

    console.log('removeItem called');

    try {
        const indexProduct = currOrder.products.findIndex(
            prod => prod._id === product._id
          );
          currOrder.totalPrice -= currOrder.products[indexProduct].price * currOrder.products[indexProduct].stockQuantity;
          currOrder.products.splice(indexProduct,1)
        setCurrentOrder(currOrder);

    // dispatch(updateOrder(currOrder._id, currOrder));

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
                          <img src={product.image} alt="" />
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
                        <td class="cart__price">{product.price}</td>
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
                          {product.price * product.stockQuantity}
                        </td>
                        <td class="cart__close">
                          <span class="icon_close" onClick={() => {
                                removeItem(product);
                              }}></span>
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
                <Link to="/checkout" class="primary-btn">
                  Proceed to checkout
                </Link>
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
