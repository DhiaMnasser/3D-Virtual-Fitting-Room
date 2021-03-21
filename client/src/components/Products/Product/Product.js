import React from "react";
import { fa, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Product = ({product}) => {
  return (
    <div class="col-lg-4 col-md-6">
      <div class="product__item">
        <div
          class="product__item__pic set-bg"

        >
          <ul class="product__hover">
            <li>
              <a href="img/shop/shop-2.jpg" class="image-popup">
                <span class="arrow_expand"></span>
              </a>
            </li>
            <li>
              <a href="#">
                <span class="icon_heart_alt"></span>
              </a>
            </li>
            <li>
              <a href="#">
                <span class="icon_bag_alt"></span>
              </a>
            </li>
          </ul>
        </div>
        <div class="product__item__text">
          <h6>
            <a href="#">{product.productName}</a>
          </h6>
          <div class="rating">
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
          </div>
          <div class="product__price">{product.price} DT</div>
        </div>
      </div>
    </div>
  );
};

export default Product;
