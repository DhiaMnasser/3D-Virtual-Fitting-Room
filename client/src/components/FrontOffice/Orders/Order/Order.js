import React, { useState, useEffect } from 'react'
import {faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from "react-redux";
import './Order.css'
import { deleteProduct } from '../../../../redux/slices/products'
import { useDispatch } from 'react-redux';
import { addItemToCart, getCurrentBasket, updateOrder, getOrders } from '../../../../redux/slices/orders';
import { Link } from 'react-router-dom';

function Order(props) {

  const orderId = window.location.pathname.split("/order/")[1];
  const order = useSelector(state =>
     
    state.orders.orders.filter(order => order._id === orderId+"")[0]
  
   );
  const dispatch = useDispatch()
//   const [order, setOrder] = useState(props.order) ;
//   const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
//   const orders = useSelector((state) => state.orders.orders);

useState(()=>{
    console.log("orderId");
    console.log(orderId);
    console.log("order");
    console.log(order);
    
})
  
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
                      <th>Ref</th>
                      <th>Client Name</th>
                      <th>Address</th>
                      <th>Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                      <tr>
                      <th>{order.ref}</th>
                      <th>{order.clientName}</th>
                      <th>{order.address}</th>
                      <th>
                        {order.isShipped ? "shipped" : "Pending"}{" "}
                      </th>
                      <th></th>
                      </tr>
                  </tbody>
            </table>
          </div>
          </div>
          </div>
          <br/>
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
                    {order?.products?.map(product => (
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
                        <td class="cart__price">{product.price} DT</td>
                        <td class="cart__quantity">
                          <div class="pro-qty">

                            <input type="text" value={product.stockQuantity} />

                          </div>
                        </td>
                        <td class="cart__total">
                          {product.price * product.stockQuantity} DT
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
              <div class="cart__btn update__btn"></div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-6">

            <div class="col-lg-4 offset-lg-2">
              <div class="cart__total__procced">
                {/* <h6>Total: {order?.totalPrice} DT</h6> */}
                <ul>
                  <li>
                    Total <span>{order?.totalPrice} DT</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>
    </>
    );
};

export default Order;