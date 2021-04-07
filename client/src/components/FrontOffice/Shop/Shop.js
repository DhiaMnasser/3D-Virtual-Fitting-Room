import React, { useState, useEffect } from "react";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import './product.css'
import { deleteProduct } from "../../../redux/slices/products";
import { useDispatch } from "react-redux";
import { addItemToCart, getCurrentBasket } from "../../../redux/slices/orders";
import ShopSideBar from "./ShopSideBar/ShopSideBar";
import ProductGrid from "../../Products/ProductGrid/Products";

function Shop(props) {
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
