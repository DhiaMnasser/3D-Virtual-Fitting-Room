import React, { useState, useEffect } from "react";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {NotificationContainer, NotificationManager} from 'react-notifications';

// import './product.css'
import { deleteProduct } from "../../../redux/slices/products";
import { useDispatch } from "react-redux";
import { addItemToCart, getCurrentBasket } from "../../../redux/slices/orders";
import ShopSideBar from "./ShopSideBar/ShopSideBar";
import ProductGrid from "../../Products/ProductGrid/Products";
NotificationManager.success('To 3DVFR', 'Welcome');

function Shop(props) {
  <NotificationContainer
  
  />

  return (
    <section class="shop spad">
      <div class="container">
        <div class="row">
          <ShopSideBar />
          <ProductGrid />
        </div>
      </div>
    </section>
  );
}

export default Shop;
