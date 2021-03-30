import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faStar } from '@fortawesome/free-solid-svg-icons';
import { getCurrentBasket } from '../../../redux/slices/orders';
import { useSelector } from "react-redux";

function Order() {
    const currentOrder = getCurrentBasket();
    const products = useSelector(state => state.products.products);
    const basket = useSelector(state => state.basket.basket);
    this.state = {value: ''};
    
    // console.log(products);
  
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
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            {basket.map(product =>(
                                <tr>
                                    <td class="cart__product__item">
                                        <img src={product.image} alt=""/>
                                        <div class="cart__product__item__title">
                                            <h6>{product.productName}</h6>
                                            <div class="rating">
                                            <FontAwesomeIcon style={{color: `#e3c01c`, fontSize:`10px`}} icon={faStar} />
                                            <FontAwesomeIcon style={{color: `#e3c01c`, fontSize:`10px`}} icon={faStar} />
                                            <FontAwesomeIcon style={{color: `#e3c01c`, fontSize:`10px`}} icon={faStar} />
                                            <FontAwesomeIcon style={{color: `#e3c01c`, fontSize:`10px`}} icon={faStar} />
                                            <FontAwesomeIcon style={{color: `#e3c01c`, fontSize:`10px`}} icon={faStar} />
                                            </div>
                                        </div>
                                    </td>
                                    <td class="cart__price">$ {product.price}</td>
                                    <td class="cart__quantity">
                                        <div class="pro-qty">
                                            <input type="text" value="1"/>
                                        </div>
                                    </td>
                                    <td class="cart__total">{product.price * product.stockQuantity}</td>
                                    <td class="cart__close"><span class="icon_close"></span></td>
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
                        <a href="#">Continue Shopping</a>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6">
                    <div class="cart__btn update__btn">
                        <a href="#"><span class="icon_loading"></span> Update cart</a>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-6">
                    <div class="discount__content">
                        <h6>Discount codes</h6>
                        <form action="#">
                            <input type="text" placeholder="Enter your coupon code" />
                            <button type="submit" class="site-btn">Apply</button>
                        </form>
                    </div>
                </div>
                <div class="col-lg-4 offset-lg-2">
                    <div class="cart__total__procced">
                        <h6>Cart total</h6>
                        <ul>
                            <li>Subtotal <span>$ 750.0</span></li>
                            <li>Total <span>$ 750.0</span></li>
                        </ul>
                        <a href="#" class="primary-btn">Proceed to checkout</a>
                    </div>
                </div>
            </div>
        </div>
    </section> 
    </>
    );
};

export default Order;