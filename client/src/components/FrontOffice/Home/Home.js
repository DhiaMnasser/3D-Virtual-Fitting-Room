import React, { useState, useEffect } from "react";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import banner from "./opening.png";
import { deleteProduct } from "../../../redux/slices/products";
import { useDispatch } from "react-redux";
import { addItemToCart, getCurrentBasket } from "../../../redux/slices/orders";
import Map from "../../Extras/Geo/Map";
import Weather from "../../Extras/Geo/Weather";
import Speech from "../../Extras/Speech/Speech";
import Geo from "../../Extras/Geo/Geo";
import Analytics from "../../Extras/Analytics/Analytics";
import Notification from "../../Extras/Notifications/Notification";
import Stats from "../../Extras/Stats/Stats";
import Trends from "../../Extras/Stats/Trends";
import Chat from "../Chatbot/Chat";

 

function Home(props) {
    NotificationManager.success('To 3DVFR', 'Welcome'); 
  return (
        <>
        
      <NotificationContainer />
      <Chat/>
      {/* <Weather></Weather>
      <Notification></Notification>
      <Geo></Geo>
      <Map></Map>
      <Speech></Speech>
      <Analytics></Analytics>
      <Stats></Stats>
      <Chatbot/> */}
      <section class="categories">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-6 p-0">
                    <img class="categories__item categories__large__item set-bg"
                    src="img/categories/category-1.jpg" alt="Virtual clothing" /> 
            </div>
            <div class="col-lg-6">
                <div class="row">
                    <div class="col-lg-6 col-md-6 col-sm-6 p-0">
                        <img class="categories__item set-bg" src="img/categories/category-2.jpg" alt="3D Avatar" /> 
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-6 p-0">
                        <img class="categories__item set-bg" src="img/categories/category-3.jpg" alt="Augmented Reality" />
                    </div>   
                    
                    <div class="col-lg-6 col-md-6 col-sm-6 p-0">
                        <img class="categories__item set-bg" src="img/categories/category-4.jpg" alt="3D online application" />
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-6 p-0">
                        <img class="categories__item set-bg" src="img/categories/category-5.jpg" alt=" Virtual Fitting room" />
                    </div>
                </div>
            </div>
        </div>
        </div>
</section>

<section class="product spad">
    <div class="container">
        <div class="row">
            <div class="col-lg-4 col-md-4">
                <div class="section-title">
                    <h4>New product</h4>
                </div>
            </div>
            <div class="col-lg-8 col-md-8">
                <ul class="filter__controls">
                    <li class="active" data-filter="*">All</li>
                    <li data-filter=".women">Women’s</li>
                    <li data-filter=".men">Men’s</li>
                    <li data-filter=".kid">Kid’s</li>
                    <li data-filter=".accessories">Accessories</li>
                    <li data-filter=".cosmetic">Cosmetics</li>
                </ul>
            </div>
        </div>
        <div class="row property__gallery">
            <div class="col-lg-3 col-md-4 col-sm-6 mix women">
                <div class="product__item">
                    <img class="product__item__pic set-bg" src="img/product/product-1.jpg" alt=" Virtual Fitting room"/>          
                    <div class="product__item__text">
                        <h6><a href="#">Buttons tweed blazer</a></h6>
                        <div class="product__price">$ 59.0</div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3 col-md-4 col-sm-6 mix men">
                <div class="product__item">
                    <img class="product__item__pic set-bg" src="img/product/product-2.jpg"  alt=" Virtual Fitting room"/>
                    <div class="product__item__text">
                        <h6><a href="#">Flowy striped skirt</a></h6>
                        <div class="product__price">$ 49.0</div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3 col-md-4 col-sm-6 mix accessories">
                <div class="product__item">
                    <img class="product__item__pic set-bg" src="img/product/product-3.jpg" alt=" Virtual Fitting room" />
                    <div class="product__item__text">
                        <h6><a href="#">Cotton T-Shirt</a></h6>
                        <div class="product__price">$ 59.0</div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3 col-md-4 col-sm-6 mix cosmetic">
                <div class="product__item">
                    <img class="product__item__pic set-bg" src="img/product/product-4.jpg" alt=" Virtual Fitting room" />
                    <div class="product__item__text">
                        <h6><a href="#">Slim striped pocket shirt</a></h6>
                        <div class="product__price">$ 59.0</div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3 col-md-4 col-sm-6 mix kid">
                <div class="product__item">
                    <img class="product__item__pic set-bg" src="img/product/product-5.jpg" alt=" Virtual Fitting room" />
                    <div class="product__item__text">
                        <h6><a href="#">Fit micro corduroy shirt</a></h6>
                        <div class="product__price">$ 59.0</div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3 col-md-4 col-sm-6 mix women men kid accessories cosmetic">
                <div class="product__item sale">
                    <img class="product__item__pic set-bg" src="img/product/product-6.jpg" alt=" Augmented Reality" />
                    <div class="product__item__text">
                        <h6><a href="#">Tropical Kimono</a></h6>
                        <div class="product__price">$ 49.0 <span>$ 59.0</span></div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3 col-md-4 col-sm-6 mix women men kid accessories cosmetic">
                <div class="product__item">
                    <img class="product__item__pic set-bg" src="img/product/product-7.jpg" alt=" Virtual Fitting room"/>
                    <div class="product__item__text">
                        <h6><a href="#">Contrasting sunglasses</a></h6>
                        <div class="product__price">$ 59.0</div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3 col-md-4 col-sm-6 mix women men kid accessories cosmetic">
                <div class="product__item sale">
                    <img class="product__item__pic set-bg" src="img/product/product-8.jpg" alt=" Virtual Fitting room"/>
                    <div class="product__item__text">
                        <h6><a href="#">Water resistant backpack</a></h6>
                        <div class="product__price">$ 49.0 <span>$ 59.0</span></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<div class="banner set-bg">
    <img  src="img/banner/banner-1.jpg" alt=" Virtual Fitting room"/>
</div>

<section class="trend spad">
    <div class="container">
        <div class="row">
            <div class="col-lg-4 col-md-4 col-sm-6">
                <div class="trend__content">
                    <div class="section-title">
                        <h4>Hot Trend</h4>
                    </div>
                    <div class="trend__item">
                        <div class="trend__item__pic">
                            <img src="img/trend/ht-1.jpg" alt=" Augmented Reality" />
                        </div>
                        <div class="trend__item__text">
                            <h6>Chain bucket bag</h6>
                            
                            <div class="product__price">$ 59.0</div>
                        </div>
                    </div>
                    <div class="trend__item">
                        <div class="trend__item__pic">
                            <img src="img/trend/ht-2.jpg" alt=" Virtual Fitting room" />
                        </div>
                        <div class="trend__item__text">
                            <h6>Pendant earrings</h6>
                            
                            <div class="product__price">$ 59.0</div>
                        </div>
                    </div>
                    <div class="trend__item">
                        <div class="trend__item__pic">
                            <img src="img/trend/ht-3.jpg" alt=" Virtual Fitting room" />
                        </div>
                        <div class="trend__item__text">
                            <h6>Cotton T-Shirt</h6>
                            <div class="product__price">$ 59.0</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6">
                <div class="trend__content">
                    <div class="section-title">
                        <h4>Best seller</h4>
                    </div>
                    <div class="trend__item">
                        <div class="trend__item__pic">
                            <img src="img/trend/bs-1.jpg" alt=" Augmented Reality" />
                        </div>
                        <div class="trend__item__text">
                            <h6>Cotton T-Shirt</h6>
                            <div class="product__price">$ 59.0</div>
                        </div>
                    </div>
                    <div class="trend__item">
                        <div class="trend__item__pic">
                            <img src="img/trend/bs-2.jpg" alt=" Virtual Fitting room" />
                        </div>
                        <div class="trend__item__text">
                            <h6>Zip-pockets pebbled tote</h6>
                            <div class="product__price">$ 59.0</div>
                        </div>
                    </div>
                    <div class="trend__item">
                        <div class="trend__item__pic">
                            <img src="img/trend/bs-3.jpg" alt=" Virtual Fitting room" />
                        </div>
                        <div class="trend__item__text">
                            <h6>Round leather bag</h6>
                            <div class="product__price">$ 59.0</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6">
                <div class="trend__content">
                    <div class="section-title">
                        <h4>Feature</h4>
                    </div>
                    <div class="trend__item">
                        <div class="trend__item__pic">
                            <img src="img/trend/f-1.jpg" alt=" Virtual Fitting room" />
                        </div>
                        <div class="trend__item__text">
                            <h6>Bow wrap skirt</h6>
                            <div class="product__price">$ 59.0</div>
                        </div>
                    </div>
                    <div class="trend__item">
                        <div class="trend__item__pic">
                            <img src="img/trend/f-2.jpg" alt=" Augmented Reality" />
                        </div>
                        <div class="trend__item__text">
                            <h6>Metallic earrings</h6>
                            <div class="product__price">$ 59.0</div>
                        </div>
                    </div>
                    <div class="trend__item">
                        <div class="trend__item__pic">
                            <img src="img/trend/f-3.jpg" alt=" Virtual Fitting room" />
                        </div>
                        <div class="trend__item__text">
                            <h6>Flap cross-body bag</h6>
                            <div class="product__price">$ 59.0</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="discount">
    <div class="container">
        <div class="row">
            <div class="col-lg-6 p-0">
                <div class="discount__pic">
                    <img src="img/discount.jpg" alt=" Augmented Reality 3D Avatar"/>
                </div>
            </div>
            <div class="col-lg-6 p-0">
                <div class="discount__text">
                    <div class="discount__text__title">
                        <span>Discount</span>
                        <h2>Summer 2019</h2>
                        <h5><span>Sale</span> 50%</h5>
                    </div>
                    <div class="discount__countdown" id="countdown-time">
                        <div class="countdown__item">
                            <span>22</span>
                            <p>Days</p>
                        </div>
                        <div class="countdown__item">
                            <span>18</span>
                            <p>Hour</p>
                        </div>
                        <div class="countdown__item">
                            <span>46</span>
                            <p>Min</p>
                        </div>
                        <div class="countdown__item">
                            <span>05</span>
                            <p>Sec</p>
                        </div>
                    </div>
                    <a href="#" >Shop now</a>
                </div>
            </div>
        </div>
    </div>
</section>


<section class="services spad">
    <div class="container">
        <div class="row">
            <div class="col-lg-3 col-md-4 col-sm-6">
                <div class="services__item">
                    <h6>Free Shipping</h6>
                    <p>For all oder over $99</p>
                </div>
            </div>
            <div class="col-lg-3 col-md-4 col-sm-6">
                <div class="services__item">
                    <h6>Money Back Guarantee</h6>
                    <p>If good have Problems</p>
                </div>
            </div>
            <div class="col-lg-3 col-md-4 col-sm-6">
                <div class="services__item">
                    <h6>Online Support 24/7</h6>
                    <p>Dedicated support</p>
                </div>
            </div>
            <div class="col-lg-3 col-md-4 col-sm-6">
                <div class="services__item">
                    <h6>Payment Secure</h6>
                    <p>100% secure payment</p>
                </div>
            </div>
        </div>
    </div>
</section>

<div class="instagram">
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-2 col-md-4 col-sm-4 p-0">
                <img class="instagram__item set-bg" src="img/instagram/insta-1.jpg" alt=" Virtual Fitting room" />
                    <div class="instagram__text">
                        <i class="fa fa-instagram"></i>
                        <a href="#">@ ashion_shop</a>
                    </div>
            </div>
            <div class="col-lg-2 col-md-4 col-sm-4 p-0">
                <img class="instagram__item set-bg" src="img/instagram/insta-2.jpg" alt=" Virtual Fitting room" />
                    <div class="instagram__text">
                        <i class="fa fa-instagram"></i>
                        <a href="#">@ ashion_shop</a>
                    </div>
            </div>
            <div class="col-lg-2 col-md-4 col-sm-4 p-0">
                <img class="instagram__item set-bg" src="img/instagram/insta-3.jpg" alt=" Augmented Reality 3D Avatar" />
                    <div class="instagram__text">
                        <i class="fa fa-instagram"></i>
                        <a href="#">@ ashion_shop</a>
                    </div>
            </div>
            <div class="col-lg-2 col-md-4 col-sm-4 p-0">
                <img class="instagram__item set-bg" src="img/instagram/insta-4.jpg" alt=" Augmented Reality" />
                    <div class="instagram__text">
                        <i class="fa fa-instagram"></i>
                        <a href="#">@ ashion_shop</a>
                    </div>
            </div>
            <div class="col-lg-2 col-md-4 col-sm-4 p-0">
                <img class="instagram__item set-bg" src="img/instagram/insta-5.jpg" />
                    <div class="instagram__text">
                        <i class="fa fa-instagram"></i>
                        <a href="#">@ ashion_shop</a>
                    </div>
            </div>
            <div class="col-lg-2 col-md-4 col-sm-4 p-0">
                <img class="instagram__item set-bg" src="img/instagram/insta-6.jpg" />
                    <div class="instagram__text">
                        <i class="fa fa-instagram"></i>
                        <a href="#">@ ashion_shop</a>
                    </div>
            </div>
        </div>
    </div>
</div>






<script src="js/jquery-3.3.1.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="js/jquery.magnific-popup.min.js"></script>
<script src="js/jquery-ui.min.js"></script>
<script src="js/mixitup.min.js"></script>
<script src="js/jquery.countdown.min.js"></script>
<script src="js/jquery.slicknav.js"></script>
<script src="js/owl.carousel.min.js"></script>
<script src="js/jquery.nicescroll.min.js"></script>
<script src="js/main.js"></script>



    </>

  )};


export default Home;
