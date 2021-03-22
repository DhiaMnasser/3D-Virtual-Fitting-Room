import React from "react";
// import Product from "../Product/Product";
import { useSelector } from "react-redux";
import { fa, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Categories = () => {

  const categories = useSelector(state => state.categories.categories);

  console.log(categories);

  return (
    <>
      <h1>Categories list</h1>

      <div class="container justify-content-md-center">
        <div class="row">
          <div class="col-lg-12">
            <div class="shop__cart__table">
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>

                {categories.map((categories)=>(
          

        
                  <tr>
                    <td class="cart__product__item">
                      
                      <div class="cart__product__item__title">
                        <h6>{categories.categoryName}</h6>
                        <div class="rating">
                          <i class="fa fa-star"></i>
                          <i class="fa fa-star"></i>
                          <i class="fa fa-star"></i>
                          <i class="fa fa-star"></i>
                          <i class="fa fa-star"></i>
                        </div>
                      </div>
                    </td>
               

                  </tr>
                  ))}

                  
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;
