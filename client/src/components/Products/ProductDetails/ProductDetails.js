import React, { useState, useEffect } from "react";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Button } from "@material-ui/core";
import * as api from "../../../api/index";
import ReactStars from "react-rating-stars-component";
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
import Avatar from "../../FrontOffice/Avatar/Avatar";

async function addToCart(id, quantity) {
  try {
    const response = await fetch("http://localhost:4000/cart", {
      method: "POST",
      body: JSON.stringify({
        productId: id,
        quantity: quantity,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
    let data = await response.json()
    console.log(data)
  } catch (err) {
    console.log(err)
  }
}

function ProductDetails(props) {
  const productId = window.location.pathname.split("/productDetails/")[1];
  console.log(
    "window.location.pathname id : " +
      window.location.pathname.split("/productDetails/")[1]
  );
  console.log("props.match.params.value: " + props.match.params.value);

  const dispatch = useDispatch();
  const prod = useSelector(
    state =>
      state.products.products[
        state.products.products.findIndex(prod => prod._id === productId+"")
      ]
  );

  console.log("prod" + JSON.stringify(prod));
  console.log("props.location.product._id" + JSON.stringify(props.location.product?._id));
  //   console.log('props'+JSON.stringify(props));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const orders = useSelector(state => state.orders.orders);
  const products = useSelector(state => state.products.products);
  const [product, setProduct] = useState(JSON.parse(localStorage.getItem("selectedProduct")));
  const reviews = useSelector(state => state.reviews.reviews);
  const [currentOrder, setCurrentOrder] = useState();
  const [threeDModel, setThreeDModel] = useState();

  useEffect(() => {
    console.log("useEffect called setThreeDModel");
    // const threeDModel =  api.fetchFileDataByName(product.threeDModel)
    // const threeDModel =  api.fetchFileByName(product.threeDModel)
    // api.fetchImageByName(product.threeDModel).then((response) => {setThreeDModel(response.data)});
    api.fetchImageByName(product.threeDModel).then((response) => {setThreeDModel(JSON.stringify(response.data))});
    // setThreeDModel(data);
    console.log('product');
    console.log(product);
    console.log(threeDModel);
    // localStorage.setItem("threeDModel", threeDModel);
    // setProduct(prod);
    // setProduct(axios.get(`http://localhost:5000/products/${productId}`).result)
    // console.log('product'+JSON.stringify( axios.get(`http://localhost:5000/products/${productId}`)));
  }, [prod]);


  
  useEffect(() => {
    if (user && currentOrder) {
      console.log(`currentOrder in product ${JSON.stringify(currentOrder)}`);
      dispatch(updateOrder(currentOrder._id, currentOrder));
    }
  }, [currentOrder]);

  const addToBasket = () => {
    try {
      setCurrentOrder(addItemToBasket(orders, product));
      // console.log(`currentOrder in product ${JSON.stringify(currentOrder)}`);

      //  dispatch(updateOrder(currentOrder._id, currentOrder ));
    } catch (error) {
      console.log(error.message);
    }
    //  dispatch(editOrder(state.orders[indexOrder]));
  };
    const ratingChanged = (newRating) => {
      console.log(newRating);
    };
  return (
        <>
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
                          <Avatar man={threeDModel}/>
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
                          <ReactStars
                           count={5}
                           onChange={ratingChanged}
                           size={24}
                           activeColor="#ffd700"
                           />,
              {product?.promo !==0 ? (
                <div class="product__details__price">
                $ {product?.price * product?.promo} <span>$ {product?.price}- {product?.price * product?.promo} </span>
                </div>

              ):(
                <div class="product__details__price">
                $ {product?.price } 
                </div>

              )}
              <p>
                Nemo enim ipsam voluptatem quia aspernatur aut odit aut loret
                fugit, sed quia consequuntur magni lores eos qui ratione
                voluptatem sequi nesciunt.
              </p>
              <div class="product__details__button">
                <div class="quantity">
                  <span>Quantity:</span>
                  <div class="pro-qty">
                    <input type="text" value="1" />
                  </div>
                </div>
                <a
                  onClick={() => {
                    if (user) addToBasket();
                  }}
                  class="cart-btn"
                >
                  <button class="icon_bag_alt"></button> Add to cart
                </a>
                <ul>
                  <li>
                    <a href="#">
                      <span class="icon_heart_alt"></span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span class="icon_adjust-horiz"></span>
                    </a>
                  </li>
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
                        <input
                          type="radio"
                          name="color__radio"
                          id="red"
                          checked
                        />
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
                        <input type="radio" id="s-btn" />s
                      </label>
                      <label for="m-btn">
                        <input type="radio" id="m-btn" />m
                      </label>
                      <label for="l-btn">
                        <input type="radio" id="l-btn" />l
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
          </div>
          <div class="col-lg-12">
                    <div class="product__details__tab">
                        <ul class="nav nav-tabs" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link" data-toggle="tab" href="#tabs-2" role="tab">Review</a>
                            </li>
                        </ul>
                        <div class="tab-content">
                            <br></br>
                        <AddReviewForm product={product} />
                        <div className="card-body">
                        {reviews.filter(review=> review.productId === (product._id)).map(filteredName => (  
                        <li>{filteredName.message}  <br/>
                        <Button hidden={user?.result?.name !== filteredName.creator} color="primary"  variant="contained"  onClick={()=>{dispatch(deleteReview(filteredName._id))}}>delete</Button>
                        <Link to={{pathname: "/updatereview/"+filteredName._id, review: filteredName}}> <Button type="button" color="danger"  variant="contained" hidden={user?.result?.name !== filteredName.creator} > update </Button></Link>
                        
                        </li>               
  ))}</div>

                <div class="tab-pane" id="tabs-1" role="tabpanel">
                                <h6>Review</h6>
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
            </div>
    </section>
    </>
  );
}

export default ProductDetails;
