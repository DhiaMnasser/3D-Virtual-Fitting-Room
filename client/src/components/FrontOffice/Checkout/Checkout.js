import React, { useState, useEffect } from 'react'
import {faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { deleteProduct } from '../../../redux/slices/products'
import { useDispatch, useSelector } from 'react-redux';
import { isAuthenticated } from '../../../redux/slices/auth';
import Product from "../../Products/Product/Product";
import Stripe from "../../Stripe/Stripe";
import {
    getCurrentBasket,
    getOrdersByUser,
    addItemToBasket,
    removeItemFromBasket,
    updateOrder
  } from "../../../redux/slices/orders";
import { Link } from 'react-router-dom';
import Help from './Help';

function Home(props) {
    const dispatch = useDispatch();
    const [connectedUser, setConnectedUser] = useState(isAuthenticated()?.result);
    let orders = useSelector(state => state.orders.orders);
    let [currentOrder, setCurrentOrder] = useState(getCurrentBasket(orders));
    let products = currentOrder?.products;
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };
      
      function success(pos) {
        var crd = pos.coords;
        console.log('Votre position actuelle est :');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude : ${crd.longitude}`);
        console.log(`La précision est de ${crd.accuracy} mètres.`);
        return (crd);
      }
      
      function error(err) {
        console.warn(`ERREUR (${err.code}): ${err.message}`);
      }
      
      navigator.geolocation.getCurrentPosition(success, error, options);
      useEffect(() => {
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
        console.log(product.stockQuantity);
        const indexProduct = currOrder.products.findIndex(
          p => p._id === product._id
        );
        currOrder.products[indexProduct].stockQuantity++;
        currOrder.totalPrice = currOrder.totalPrice + product.price;
        setCurrentOrder(currOrder);
      console.log(`currentOrder in incQuantity ${JSON.stringify(currentOrder)}`);  
      } catch (error) {
        console.log(error);
      }
    };
  
    const decQuantity = (prod) => {
      const product = JSON.parse(JSON.stringify(prod));
      const currOrder = JSON.parse(JSON.stringify(currentOrder));
      console.log('decQuantity called');
      try {
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
      } catch (error) {
        console.log(error);
      }
    };
    return (
        <section class="checkout spad">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <h6 class="coupon__link"><a href="#">Have a coupon?</a> Click
                    here to enter your code.</h6>
                </div>
            </div>
            <form action="#" class="checkout__form">
                <div class="row">
                    <div class="col-lg-8">
                        <h5>Billing detail</h5>
                        <div class="row">
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="checkout__form__input">
                                    <p>First Name <span>*</span></p>
                                    <input type="text"/>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="checkout__form__input">
                                    <p>Last Name <span>*</span></p>
                                    <input type="text"/>
                                </div>
                            </div>
                            <div class="col-lg-12">
                                <div class="checkout__form__input">
                                    <p>Country <span>*</span></p>
                                    <input type="text"/>
                                </div>
                                <div class="checkout__form__input">
                                    <p>Address <span>*</span></p>
                                    <input type="text" placeholder="Street Address"/>
                                    <input type="text" placeholder="Apartment. suite, unite ect ( optinal )"/>
                                </div>
                                <div class="checkout__form__input">
                                    <p>Town/City <span>*</span></p>
                                    <input type="text"/>
                                </div>
                                <div class="checkout__form__input">
                                    <p>Country/State <span>*</span></p>
                                    <input type="text"/>
                                </div>
                                <div class="checkout__form__input">
                                    <p>Postcode/Zip <span>*</span></p>
                                    <input type="text"/>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="checkout__form__input">
                                    <p>Phone <span>*</span></p>
                                    <input type="text"/>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="checkout__form__input">
                                    <p>Email <span>*</span></p>
                                    <input type="text"/>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="checkout__form__input">
                                    <p>Your Latitude <span> *</span></p>
                                    <input type="text"/>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="checkout__form__input">
                                    <p>Your Longitude <span> *</span></p>
                                    <input type="text"/>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="checkout__order">
                                <h5>Your order</h5>
                                <div class="checkout__order__product">
                                    <ul>
                                        <li>
                                            <span class="top__text">Product</span>
                                            <span class="top__text__right">Total</span>
                                        </li>
                                        {products?.map(product => (
                                        <li>
                                            {product.productName} <span>{product.price}</span>
                                        </li>
                                                                                    ))}
                                    </ul>
                                </div>
                                <div class="checkout__order__total">
                                    <ul>
                                        <li>Subtotal <span>{currentOrder?.totalPrice} DT</span></li>
                                        <li>Total <span>{currentOrder?.totalPrice} DT</span></li>
                                    </ul>
                                </div>
                                <div class="checkout__order__widget">
                                    <label for="o-acc">
                                        Create an acount?
                                        <input type="checkbox" id="o-acc"/>
                                    </label>
                                    <p>Create am acount by entering the information below. If you are a returing customer
                                    login at the top of the page.</p>
                                    <label for="check-payment">
                                        Cheque payment
                                        <input type="checkbox" id="check-payment"/>
                                    </label>
                                    <label for="paypal">
                                        PayPal
                                        <input type="checkbox" id="paypal"/>
                                    </label>
                                </div>
                                <Stripe name="yoyo" price={currentOrder?.totalPrice}></Stripe>
                                <button type="submit" class="site-btn">Place oder</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Home