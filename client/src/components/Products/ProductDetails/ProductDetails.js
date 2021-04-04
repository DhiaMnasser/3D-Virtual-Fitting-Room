import React, { useState, useEffect } from "react";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { Link, useParams } from 'react-router-dom';
import { Button } from "@material-ui/core";

import "./ProductDetails.css";
import { deleteProduct } from "../../../redux/slices/products";
import { useDispatch } from "react-redux";
import {
  addItemToCart,
  getCurrentBasket,
  updateOrder,
  addItemToBasket
} from "../../../redux/slices/orders";
import AddReviewForm from "../../Forms/ReviewForm/AddReview/AddReviewForm";
import { deleteReview } from "../../../redux/slices/reviews";
import axios from "axios";



function ProductDetails(props) {


    const productId = window.location.pathname.split("productDetails")[1];
    // console.log('window.location.pathname id' + window.location.pathname.split("productDetails")[1]);
    
  const dispatch = useDispatch();
//   const prod = useSelector(state => state.products.products.find(prod => prod._id === props.location.product._id));

// console.log('product'+JSON.stringify(product));
const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
const orders = useSelector(state => state.orders.orders);
const products = useSelector(state => state.products.products);
let [product, setProduct] = useState(JSON.parse(JSON.stringify(props.location.product)));
  const reviews = useSelector(state=>state.reviews.reviews)
  const [currentOrder, setCurrentOrder] = useState();

 
useEffect(() => {
    // setProduct(axios.get(`http://localhost:5000/products/${productId}`).result)
console.log('product'+JSON.stringify( axios.get(`http://localhost:5000/products/${productId}`)));

}, [])  
  useEffect(() => {
    if( user && currentOrder ){
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
    <section class="product-details spad">
        <div class="container">
            <div class="row">
                <div class="col-lg-6">
                    <div class="product__details__pic">
                        <div class="product__details__pic__left product__thumb nice-scroll">
                            <a class="pt active" href="#product-1">
                                <img src={product.image} alt="" />
                            </a>
                            <a class="pt" href="#product-2">
                                <img src={product.image} alt="" />
                            </a>
                            <a class="pt" href="#product-3">
                                <img src={product.image} alt="" />
                            </a>
                        
                        </div>
                        <div class="product__details__slider__content">
                            <div class="product__details__pic__slider owl-carousel">
                                <img  class="product__big__img" src={product.image} alt="Waa"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="product__details__text">
                        <h3>{product.productName} <span>Brand: ITPaladins</span></h3>
                        <div className="rating">
            {(
              <FontAwesomeIcon
                style={{ color: `#e3c01c`, fontSize: `10px` }}
                icon={faStar}
              />
            )}
            {(
              <FontAwesomeIcon
                style={{ color: `#e3c01c`, fontSize: `10px` }}
                icon={faStar}
              />
            )}
            {(
              <FontAwesomeIcon
                style={{ color: `#e3c01c`, fontSize: `10px` }}
                icon={faStar}
              />
            )}
            {(
              <FontAwesomeIcon
                style={{ color: `#e3c01c`, fontSize: `10px` }}
                icon={faStar}
              />
            )}
            {(
              <FontAwesomeIcon
                style={{ color: `#e3c01c`, fontSize: `10px` }}
                icon={faStar}
              />
            )}
          </div>
                        <div class="product__details__price">$ {product.price} <span>$ {product.price}-10 </span></div>
                        <p>Nemo enim ipsam voluptatem quia aspernatur aut odit aut loret fugit, sed quia consequuntur
                        magni lores eos qui ratione voluptatem sequi nesciunt.</p>
                        <div class="product__details__button">
                            <div class="quantity">
                                <span>Quantity:</span>
                                <div class="pro-qty">
                                    <input type="text" value="1" />
                                </div>
                            </div>
                            <a onClick={() => {if(user)addToBasket()}} class="cart-btn"><span class="icon_bag_alt"></span> Add to cart</a>
                            <ul>
                                <li><a href="#"><span class="icon_heart_alt"></span></a></li>
                                <li><a href="#"><span class="icon_adjust-horiz"></span></a></li>
                            </ul>
                        </div>
                        <div class="product__details__widget">
                            <ul>
                                <li>
                                    <span>Availability:</span>
                                    <div class="stock__checkbox">
                                        <label for="stockin">
                                            In Stock
                                            <input type="checkbox" id="stockin" />
                                            <span class="checkmark"></span>
                                        </label>
                                    </div>
                                </li>
                                <li>
                                    <span>Color:</span>
                                    <div class="color__checkbox">
                                        <label for="red">
                                            <input type="radio" name="color__radio" id="red" checked />
                                            <span class="checkmark"></span>
                                        </label>
                                        <label for="black">
                                            <input type="radio" name="color__radio" id="black" />
                                            <span class="checkmark black-bg"></span>
                                        </label>
                                        <label for="grey">
                                            <input type="radio" name="color__radio" id="grey" />
                                            <span class="checkmark grey-bg"></span>
                                        </label>
                                    </div>
                                </li>
                                <li>
                                    <span>Size:</span>
                                    <div class="size__btn">
                                        <label for="xs-btn" class="active">
                                            <input type="radio" id="xs-btn" />
                                            xs
                                        </label>
                                        <label for="s-btn">
                                            <input type="radio" id="s-btn"/>
                                            s
                                        </label>
                                        <label for="m-btn">
                                            <input type="radio" id="m-btn"/>
                                            m
                                        </label>
                                        <label for="l-btn">
                                            <input type="radio" id="l-btn"/>
                                            l
                                        </label>
                                    </div>
                                </li>
                                <li>
                                    <span>Promotions:</span>
                                    <p>Free shipping</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-lg-12">
                    <div class="product__details__tab">
                        <ul class="nav nav-tabs" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" data-toggle="tab" href="#tabs-1" role="tab">Description</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" data-toggle="tab" href="#tabs-2" role="tab">Specification</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" data-toggle="tab" href="#tabs-3" role="tab">Reviews ( 2 )</a>
                            </li>
                        </ul>
                        <div class="tab-content">
                        <AddReviewForm product={product} />
                        <div className="card-body">
                        {reviews.filter(review=> review.productId === (product._id)).map(filteredName => (  
                        <li>{filteredName.message}  <br/>
                        <Button hidden={user?.result?.name !== filteredName.creator} color="primary"  variant="contained"  onClick={()=>{dispatch(deleteReview(filteredName._id))}}>delete</Button>
                <Link to={{pathname: "/updatereview/"+filteredName._id, review: filteredName}}> <Button type="button" color="danger"  variant="contained" hidden={user?.result?.name !== filteredName.creator} > update </Button></Link>
                        
                        </li>
                     
                        
  ))}</div>
                            <div class="tab-pane active" id="tabs-1" role="tabpanel">
                                <h6>Description</h6>
                                <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut loret fugit, sed
                                    quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt loret.
                                    Neque porro lorem quisquam est, qui dolorem ipsum quia dolor si. Nemo enim ipsam
                                    voluptatem quia voluptas sit aspernatur aut odit aut loret fugit, sed quia ipsu
                                    consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Nulla
                                consequat massa quis enim.</p>
                                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget
                                    dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,
                                    nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium
                                quis, sem.</p>
                            </div>
                            <div class="tab-pane" id="tabs-2" role="tabpanel">
                                <h6>Specification</h6>
                                <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut loret fugit, sed
                                    quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt loret.
                                    Neque porro lorem quisquam est, qui dolorem ipsum quia dolor si. Nemo enim ipsam
                                    voluptatem quia voluptas sit aspernatur aut odit aut loret fugit, sed quia ipsu
                                    consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Nulla
                                consequat massa quis enim.</p>
                                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget
                                    dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,
                                    nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium
                                quis, sem.</p>
                            </div>
                            <div class="tab-pane" id="tabs-3" role="tabpanel">
                                <h6>Reviews ( 2 )</h6>
                                <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut loret fugit, sed
                                    quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt loret.
                                    Neque porro lorem quisquam est, qui dolorem ipsum quia dolor si. Nemo enim ipsam
                                    voluptatem quia voluptas sit aspernatur aut odit aut loret fugit, sed quia ipsu
                                    consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Nulla
                                consequat massa quis enim.</p>
                                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget
                                    dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,
                                    nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium
                                quis, sem.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12 text-center">
                    <div class="related__title">
                        <h5>RELATED PRODUCTS</h5>
                    </div>
                </div>
                <div class="col-lg-3 col-md-4 col-sm-6">
                    <div class="product__item">
                        <div class="product__item__pic set-bg" data-setbg="img/product/related/rp-1.jpg">
                            <div class="label new">New</div>
                            <ul class="product__hover">
                                <li><a href="img/product/related/rp-1.jpg" class="image-popup"><span class="arrow_expand"></span></a></li>
                                <li><a href="#"><span class="icon_heart_alt"></span></a></li>
                                <li><a href="#"><span class="icon_bag_alt"></span></a></li>
                            </ul>
                        </div>
                        <div class="product__item__text">
                            <h6><a href="#">Buttons tweed blazer</a></h6>
                            <div class="rating">
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                            </div>
                            <div class="product__price">$ 59.0</div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-4 col-sm-6">
                    <div class="product__item">
                        <div class="product__item__pic set-bg" data-setbg="img/product/related/rp-2.jpg">
                            <ul class="product__hover">
                                <li><a href="img/product/related/rp-2.jpg" class="image-popup"><span class="arrow_expand"></span></a></li>
                                <li><a href="#"><span class="icon_heart_alt"></span></a></li>
                                <li><a href="#"><span class="icon_bag_alt"></span></a></li>
                            </ul>
                        </div>
                        <div class="product__item__text">
                            <h6><a href="#">Flowy striped skirt</a></h6>
                            <div class="rating">
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                            </div>
                            <div class="product__price">$ 49.0</div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-4 col-sm-6">
                    <div class="product__item">
                        <div class="product__item__pic set-bg" data-setbg="img/product/related/rp-3.jpg">
                            <div class="label stockout">out of stock</div>
                            <ul class="product__hover">
                                <li><a href="img/product/related/rp-3.jpg" class="image-popup" ><span class="arrow_expand"></span></a></li>
                                <li><a href="#"><span class="icon_heart_alt"></span></a></li>
                                <li><a href="#"><span class="icon_bag_alt"></span></a></li>
                            </ul>
                        </div>
                        <div class="product__item__text">
                            <h6><a href="#">Cotton T-Shirt</a></h6>
                            <div class="rating">
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                            </div>
                            <div class="product__price">$ 59.0</div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-4 col-sm-6">
                    <div class="product__item">
                        <div class="product__item__pic set-bg" data-setbg="img/product/related/rp-4.jpg">
                            <ul class="product__hover">
                                <li><a href="img/product/related/rp-4.jpg" class="image-popup"><span class="arrow_expand"></span></a></li>
                                <li><a href="#"><span class="icon_heart_alt"></span></a></li>
                                <li><a href="#"><span class="icon_bag_alt"></span></a></li>
                            </ul>
                        </div>
                        <div class="product__item__text">
                            <h6><a href="#">Slim striped pocket shirt</a></h6>
                            <div class="rating">
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                            </div>
                            <div class="product__price">$ 59.0</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}

export default ProductDetails;
