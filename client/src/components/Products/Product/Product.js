import React, { useState, useEffect } from "react";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

import "./product.css";
import { deleteProduct } from "../../../redux/slices/products";
import { useDispatch } from "react-redux";
import {
  addItemToCart,
  getCurrentBasket,
  updateOrder
} from "../../../redux/slices/orders";

function Product(props) {
  const dispatch = useDispatch();
  const [product, setProduct] = useState(props.product);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const orders = useSelector(state => state.orders.orders);
  useEffect(() => {
    // console.log(`props ${props.product}`);
    // console.log(`product ${product.stockQuantity}`);
    // console.log(`product after ${product.stockQuantity}`);
    // dispatch(addItemToCart(product));
    console.log(`product : ${product}`);

    // getCurrentBasket();
  }, [product]);

  const addToBasket = () => {
    try {
      const indexOrder = orders.findIndex(
        order => !order.isValid && order.clientId === user.result._id
      );
      let newOrder = orders[indexOrder];
      // const indexOrder = state.orders.findIndex((order)=> !order.isValid && order.clientId === JSON.parse(localStorage.getItem('profile')).result._id );
      // const indexOrder = state.orders.findIndex((order)=> order.clientId === "605e25bdd6c4bd30e8ceebcc");
      console.log("Order" + JSON.stringify(orders));
      console.log("user" + JSON.stringify(user));
      console.log("indexOrder" + indexOrder);

      const indexProduct = newOrder.products.findIndex(
        prod => prod._id === product._id
      );
      console.log("indexProduct" + indexProduct);

      // const indexProduct = state.orders[indexOrder].products.findIndex((prod)=> prod._id === action.payload._id);
      if (indexProduct !== -1) {
        newOrder.products[indexProduct].stockQuantity++;
        console.log("indexProduct" + indexProduct);
      } else {
        newOrder.products = [...newOrder.products, product];
        console.log("Order" + JSON.stringify(newOrder));
      }
      //  updateOrder(orders[indexOrder]._id, orders[indexOrder] );
    } catch (error) {
      console.log(error.message);
    }
    //  dispatch(editOrder(state.orders[indexOrder]));
  };

  return (
    <div className={props.class}>
      <div className="product__item">
        <div
          className="product__item__pic set-bg"
          style={{ backgroundImage: `url(${props.product.image})` }}
          data-setbg={props.product.image}
        >
          <div className="label new">New</div>
          <div className="label stockout">out of stock</div>
          <ul className="product__hover">
            <li>
              <a href={props.product.image} className="image-popup">
                <span className="ei ei-arrow_expand"></span>
              </a>
            </li>
            <li>
              <a href="#">
                <span className="ei ei-icon_heart_alt"></span>
              </a>
            </li>
            <li>
              <a onClick={() => addToBasket()}>
                <span className="ei ei-icon_bag_alt"></span>
              </a>
            </li>
          </ul>
        </div>
        <div className="product__item__text">
          <h6>
            <Link
              to={{
                pathname: "/productDetails/" + props.product._id,
                product: props.product
              }}
            >
            {props.product.productName}

            </Link>
          </h6>
          <div className="rating">
            {props.stars >= 1 && (
              <FontAwesomeIcon
                style={{ color: `#e3c01c`, fontSize: `10px` }}
                icon={faStar}
              />
            )}
            {props.stars >= 2 && (
              <FontAwesomeIcon
                style={{ color: `#e3c01c`, fontSize: `10px` }}
                icon={faStar}
              />
            )}
            {props.stars >= 3 && (
              <FontAwesomeIcon
                style={{ color: `#e3c01c`, fontSize: `10px` }}
                icon={faStar}
              />
            )}
            {props.stars >= 4 && (
              <FontAwesomeIcon
                style={{ color: `#e3c01c`, fontSize: `10px` }}
                icon={faStar}
              />
            )}
            {props.stars >= 5 && (
              <FontAwesomeIcon
                style={{ color: `#e3c01c`, fontSize: `10px` }}
                icon={faStar}
              />
            )}
          </div>
          <div className="product__price">${props.product.price}</div>
          {/* <div className="product__price">$ 49.0 <span>$ 59.0</span></div> */}
        </div>
      </div>
      <button
        onClick={() => {
          dispatch(deleteProduct(props.product._id));
        }}
      >
        delete
      </button>
      <button onClick={() => {}}>update</button>
      <script></script>
    </div>
  );
}

export default Product;
