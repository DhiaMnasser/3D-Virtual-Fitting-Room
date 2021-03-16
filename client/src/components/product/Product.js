import React from 'react'
import {faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './product.css'
function Product(props) {
    return (
        <div className={props.class}>
                <div className="product__item">
                    <div className="product__item__pic set-bg"  style={{backgroundImage: `url(${props.img})`}}data-setbg={props.img}>
                              <div className="label new">New</div> 
                              <div className="label stockout">out of stock</div>
                        <ul className="product__hover">
                            <li><a href={props.img} className="image-popup"><span className="ei ei-arrow_expand"></span></a></li>
                            <li><a href="#"><span className="ei ei-icon_heart_alt"></span></a></li>
                            <li><a href="#"><span className="ei ei-icon_bag_alt"></span></a></li>
                        </ul>
                    </div>
                    <div className="product__item__text">
                        <h6><a href="#">{props.name}</a></h6>
                        <div className="rating">
                          { props.stars>=1 && <FontAwesomeIcon style={{color: `#e3c01c`, fontSize:`10px`}} icon={faStar} />} 
                          { props.stars>=2 &&<FontAwesomeIcon style={{color: `#e3c01c`, fontSize:`10px`}} icon={faStar} />}
                          {props.stars>=3 && <FontAwesomeIcon style={{color: `#e3c01c`, fontSize:`10px`}} icon={faStar} />}  
                          {props.stars>=4 && <FontAwesomeIcon style={{color: `#e3c01c`, fontSize:`10px`}} icon={faStar} />}  
                          { props.stars>=5 &&<FontAwesomeIcon style={{color: `#e3c01c`, fontSize:`10px`}} icon={faStar} />}
                        </div>
                        <div className="product__price">${props.price}</div>
                       {/*  <div className="product__price">$ 49.0 <span>$ 59.0</span></div> */}
                    </div>
                </div>
                <script> 

                </script>
            </div>
    )
}

export default Product
