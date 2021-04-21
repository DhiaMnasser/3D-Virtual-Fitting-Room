import React, { useState } from "react";
// import Product from "../Product/Product";
import { fa, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from 'react-redux'
import { deleteCategory } from "../../../redux/slices/categories";
const Categories = () => {
  const dispatch= useDispatch()
  const [update, setUpdate] = useState(false)
  const categories = useSelector(state => state.categories.categories);

  console.log(categories);
  const handle=()=>{
    setUpdate(!update)
    };
    const style = {
      
    };
  return (
    <>
    <link href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
    <script src="//netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min.js"></script>
    <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
<div class="container">
    <div class="row">
        <div class="">
            <div class="panel panel-primary">
                <div class="panel-heading">
                    <span class="glyphicon glyphicon-list"></span>Categories List
                    <div class="pull-right action-buttons">
                        <div class="btn-group pull-right">
                            <button type="button" class="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown">
                                <span class="glyphicon glyphicon-cog" style={style}></span>
                            </button>
                            <ul class="dropdown-menu slidedown">
                                <li><a href="http://www.jquery2dotnet.com"><span class="glyphicon glyphicon-pencil"></span>Edit</a></li>
                                <li><a href="#"><span class="glyphicon glyphicon-trash"></span>Delete</a></li>
                                <li><a href="http://www.jquery2dotnet.com"><span class="glyphicon glyphicon-flag"></span>Flag</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                {categories.map((categories)=>(
                <div class="panel-body">
                    <ul class="list-group">
                        <li class="list-group-item">
                            <div class="checkbox">
                                <input type="checkbox" id="checkbox" />
                                <label for="checkbox" onClick={()=>{  handle()}}>
                                {categories.categoryName}
                                </label>
                            </div>
                            <div class="pull-right action-buttons">
                                <a href="http://www.jquery2dotnet.com"><span class="glyphicon glyphicon-pencil"></span></a>
                                <button onClick={()=>{  dispatch(deleteCategory(Categories._id))}}class="trash"><span class="glyphicon glyphicon-trash"></span></button>
                                <a href="http://www.jquery2dotnet.com" class="flag"><span class="glyphicon glyphicon-flag"></span></a>
                            </div>
                        </li>
                    </ul>
                </div>
                 ))}
                <div class="panel-footer">
                    <div class="row">
                        <div class="col-md-6">
                            <h6>
                                Total Count <span class="label label-info">25</span></h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

      {/* <h1>Categories list</h1>
      <div className="container justify-content-md-center">
        <div className="row">
          <div className="col-lg-12">
            <div className="shop__cart__table">
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
                    <td className="cart__product__item">
                      
                      <div className="cart__product__item__title">
                        <h6>{categories.categoryName}</h6>
                        <div className="rating">
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
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
      </div> */}
    </>
  );
};

export default Categories;
