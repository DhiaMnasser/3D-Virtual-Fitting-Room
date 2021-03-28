import React, { useState, useEffect } from 'react'
import {faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// import './product.css'
import { deleteProduct } from '../../../redux/slices/products'
import { useDispatch } from 'react-redux';
import { addItemToCart, getCurrentBasket } from '../../../redux/slices/orders';

function Product(props) {
  const dispatch = useDispatch()
  const [product, setProduct] = useState(props.product) ;
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  useEffect(() => {
      // console.log(`props ${props.product}`);
      // console.log(`product ${product.stockQuantity}`);
      // console.log(`product after ${product.stockQuantity}`);
    // dispatch(addItemToCart(product));
    console.log(`user : ${user}`);
    
    // getCurrentBasket();
          
  }, [product])

    return (
        <div className={props.class}>
                <div className="product__item">
                    <div className="product__item__pic set-bg"  style={{backgroundImage: `url(${props.product.image})` }} data-setbg={props.product.image}>
                              <div className="label new">New</div> 
                              <div className="label stockout">out of stock</div>
                        <ul className="product__hover">
                            <li><a href={props.product.image} className="image-popup"><span className="ei ei-arrow_expand"></span></a></li>
                            <li><a href="#"><span className="ei ei-icon_heart_alt"></span></a></li>
                            {/* <li><a onClick={dispatch(addItemToCart(props.product))}><span className="ei ei-icon_bag_alt"></span></a></li> */}
                        </ul>
                    </div>
                    <div className="product__item__text">
                        <h6><a href="#">{props.product.productName}</a></h6>
                        <div className="rating">
                          { props.stars>=1 && <FontAwesomeIcon style={{color: `#e3c01c`, fontSize:`10px`}} icon={faStar} />} 
                          { props.stars>=2 &&<FontAwesomeIcon style={{color: `#e3c01c`, fontSize:`10px`}} icon={faStar} />}
                          {props.stars>=3 && <FontAwesomeIcon style={{color: `#e3c01c`, fontSize:`10px`}} icon={faStar} />}  
                          {props.stars>=4 && <FontAwesomeIcon style={{color: `#e3c01c`, fontSize:`10px`}} icon={faStar} />}  
                          { props.stars>=5 &&<FontAwesomeIcon style={{color: `#e3c01c`, fontSize:`10px`}} icon={faStar} />}
                        </div>
                        <div className="product__price">${props.product.price}</div>
                       {/*  <div className="product__price">$ 49.0 <span>$ 59.0</span></div> */}
                    </div>
                </div>
                <button onClick={()=>{dispatch(deleteProduct(props.product._id))}}>delete</button>
                <button onClick={()=>{}}>update</button>
                <script> 
                </script>
            </div>
    )
}

export default Product