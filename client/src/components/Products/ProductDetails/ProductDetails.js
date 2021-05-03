import React, { useState, useEffect } from "react";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Button } from "@material-ui/core";
import * as api from "../../../api/index";
import ReactStars from "react-rating-stars-component";
// import "./ProductDetails.css";
// import "./ProductDetails.css";

import { listProductsByRecommendations } from "../../../redux/slices/products";
import "./ProductDetails.css";
import { deleteProduct, updateProduct } from "../../../redux/slices/products";
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
import Product from "../Product/Product";
import Likes from "../../Extras/Likes/Likes";




function ProductDetails(props) {
  const productId = window.location.pathname.split("/productDetails/")[1];

  const dispatch = useDispatch();
  const prod = useSelector(
    state =>
      state.products.products[
        state.products.products.findIndex(prod => prod._id === productId + "")
      ]
  );


  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const orders = useSelector(state => state.orders.orders);
  const products = useSelector(state => state.products.products);
  const [product, setProduct] = useState(
    JSON.parse(localStorage.getItem("selectedProduct"))
  );
  const reviews = useSelector(state => state.reviews.reviews);
  const [currentOrder, setCurrentOrder] = useState();
  const [threeDModel, setThreeDModel] = useState();

 

  let productDataArray =
    JSON.parse(localStorage.getItem("productDataArray")) || [];

  console.log("productDataArray");
  console.log(productDataArray);


  useEffect(() => {
    let index = productDataArray.findIndex(prod => prod._id === product?._id);

    if (index === -1) {
      productDataArray.push(product);
      localStorage.setItem(
        "productDataArray",
        JSON.stringify(productDataArray)
      );
    }
    api.fetchImageByName(product?.threeDModel).then(response => {
      setThreeDModel(JSON.stringify(response.data));
    });
    // console.log(`selectedProduct in productDetails`);
    // console.log(product);

    // localStorage.setItem("selectedProduct",JSON.stringify(product));
    // setProduct(prod);

  }, [prod]);
 

  useEffect(() => {
    // localStorage.setItem("selectedProduct",JSON.stringify(product));
    console.log(`Product in productDetails`);
    console.log(product);
    setProduct(JSON.parse(localStorage.getItem("selectedProduct")));
    console.log(product);
    if(user){
      let data = {"userId":user.result._id,product};
      console.log('data');
      console.log(data);
      
    dispatch(listProductsByRecommendations(data));
    }
  },[productId]);

  useEffect(() => {
    if (user && currentOrder) {
      console.log(`currentOrder in product ${JSON.stringify(currentOrder)}`);
      dispatch(updateOrder(currentOrder._id, currentOrder));
    }
  }, [currentOrder]);

  const addToBasket = () => {
    try {
      setCurrentOrder(addItemToBasket(orders, product));
      api.itemAddedToBasket({"userId":user.result._id,product});
    } catch (error) {
      console.log(error.message);
    }
  };

  const ratingChanged = (newRating) => {
    console.log(newRating);
    // setProduct(product.rating=product.rating+newRating/product.nbrating+1);
    product.rating = newRating;
    setProduct(product);
    updateProduct(product);
    console.log(product);
  };
  
    // ***********  recommendation  *************
    const productKNNRecommended = useSelector(
      state => state.products.productKNNRecommended
    );
    
    const topRatedProducts = useSelector(
      state => state.products.topProducts
    );
  
    useEffect(() => {
      if(user){
        let data = {"userId":user.result._id,product};
        console.log('data');
        console.log(data);
        
      dispatch(listProductsByRecommendations(data));
      }
    }, []);
  
    const browsingHistory = () => {
      if (productDataArray === null) {
        return false;
      } else {
        return true;
      }
    };
  
    function recommendProducts() {
      console.log('productKNNRecommended');
      console.log(productKNNRecommended);
      if (productKNNRecommended?.length > 0) {
        return true;
      } else {
        return false;
      }
    }
  
    // ******************************************


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
                    <Likes></Likes><br></br>
                    {product.rating}
                    <ReactStars
                     count={5}
                     onChange={ratingChanged}
                     value={product.rating}
                     size={24}
                     activeColor="#ffd700"
                     />
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
          {product.description}
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
            <button></button> Add to cart
          </a>
        </div>
        <div class="product__details__widget">
          <ul>
            <li>
              <span>Availability:</span>
              <div class="stock__checkbox">
                  In Stock
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
      <div className="row">
          <div class="col-lg-12 text-center">
            <div class="related__title">
              <h5>Top Rated</h5>
            </div>
          </div>

          {topRatedProducts && (
            <>
              <div className="row row-horizon col-lg-12 col-md-12 col-sm-12 text-center">
                <div className="d-flex flex-row flex-nowrap overflow-auto col-lg-12 col-md-12 col-sm-12">
                  {topRatedProducts?.map(product => (
                    <Product
                      key={product?._id}
                      product={product}
                      class="col-lg-4 col-md-4 col-sm-6 mix cosmetic"
                      stars="5"
                    />
                    
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      
  
          {recommendProducts() && (
            <>
        <div className="row">
          <div class="col-lg-12 text-center">
            <div class="related__title">
              <h5>RELATED PRODUCTS</h5>
            </div>
          </div>

              <div className="row row-horizon col-lg-12 col-md-12 col-sm-12 text-center">
                <div className="d-flex flex-row flex-nowrap overflow-auto col-lg-12 col-md-12 col-sm-12">
                  {productKNNRecommended?.map(product => (
                    <Product
                      key={product?._id}
                      product={product}
                      class="col-lg-4 col-md-4 col-sm-6 mix cosmetic"
                      stars="5"
                    />
                    
                  ))}
                </div>
              </div>
        </div>
            </>
          )}
      

        <div className="row">
          <div class="col-lg-12 text-center">
            <div class="related__title">
              <h5>RECENTLY VIEWED</h5>
            </div>
          </div>

          {browsingHistory() && (
            <>
              <div className="row row-horizon col-lg-12 col-md-12 col-sm-12 text-center">
                <div className="d-flex flex-row flex-nowrap overflow-auto col-lg-12 col-md-12 col-sm-12">
                  {productDataArray?.map(product => (
                    <Product
                      key={product?._id}
                      product={product}
                      class="col-lg-4 col-md-4 col-sm-6 mix cosmetic"
                      stars="5"
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
</section>
</>
);
}

export default ProductDetails;
