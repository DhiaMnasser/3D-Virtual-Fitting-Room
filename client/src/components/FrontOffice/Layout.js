import React, { Component, Suspense } from "react";
// import Leftside from './Leftside/Leftside';
import { Route, Switch, Redirect } from "react-router-dom";
import {faHome } from '@fortawesome/free-solid-svg-icons';
import './Layout.css'


import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Products from "../Products/ProductGrid/Products";
import Form from "../Forms/ProductForm/AddProduct/AddProductForm";
import products, { addProduct } from "../../redux/slices/products";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Chat from "./Chatbot/Chat";

export default ({ children }) => {
  console.log("render Main Client");

  return (
    <>
    {/* Preloader */}
      <div id="preloder" style={{display: 'none'}}>
        <div class="loader" style={{display: `none`}}></div>
      </div>
      {/* offCanvas */}
      <div class="offcanvas-menu-overlay"></div>
      <div class="offcanvas-menu-wrapper">
        <div class="offcanvas__close">+</div>
        <ul class="offcanvas__widget">
            <li><span class="icon_search search-switch"></span></li>
            <li><a href="#"><span class="icon_heart_alt"></span>
                <div class="tip">2</div>
            </a></li>
            <li><a href="#"><span class="icon_bag_alt"></span>
                <div class="tip">2</div>
            </a></li>
        </ul>
        <div class="offcanvas__logo">
            <a href="./index.html"><img src="img/logo.png" alt=""/></a>
        </div>
        <div id="mobile-menu-wrap"><div class="slicknav_menu"><a href="#" aria-haspopup="true" role="button" tabindex="0" class="slicknav_btn slicknav_collapsed" style={{outline: `none`}}><span class="slicknav_menutxt">MENU</span><span class="slicknav_icon"><span class="slicknav_icon-bar"></span><span class="slicknav_icon-bar"></span><span class="slicknav_icon-bar"></span></span></a><nav class="slicknav_nav slicknav_hidden" aria-hidden="true" role="menu" style={{display: `none`}}>
                        <ul>
                            <li class="active"><a href="./index.html" role="menuitem">Home</a></li>
                            <li><a href="#" role="menuitem">Women’s</a></li>
                            <li><a href="#" role="menuitem">Men’s</a></li>
                            <li><a href="./shop.html" role="menuitem">Shop</a></li>
                            <li class="slicknav_collapsed slicknav_parent"><a href="#" role="menuitem" aria-haspopup="true" tabindex="-1" class="slicknav_item slicknav_row" style={{outline: `none`}}><a href="#">Pages</a>
                                <span class="slicknav_arrow">►</span></a><ul class="dropdown slicknav_hidden" role="menu" aria-hidden="true" style={{display: `none`}}>
                                    <li><a href="./product-details.html" role="menuitem" tabindex="-1">Product Details</a></li>
                                    <li><a href="./shop-cart.html" role="menuitem" tabindex="-1">Shop Cart</a></li>
                                    <li><a href="./checkout.html" role="menuitem" tabindex="-1">Checkout</a></li>
                                    <li><a href="./blog-details.html" role="menuitem" tabindex="-1">Blog Details</a></li>
                                </ul>
                            </li>
                            <li><a href="./blog.html" role="menuitem">Blog</a></li>
                            <li><a href="./contact.html" role="menuitem">Contact</a></li>
                        </ul>
                    </nav></div></div>
        <div class="offcanvas__auth">
            <a href="#">Login</a>
            <a href="#">Register</a>
        </div>
    </div>
      <Header />
      {/* <div class="breadcrumb-option">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="breadcrumb__links">
                        <a href="./index.html"><FontAwesomeIcon icon={faHome}/> Home</a>
                    </div>
                </div>
            </div>
        </div>
    </div> */}
      {children}
      {/* <Chat/> */}
      <Footer />
    </>
  );
};
