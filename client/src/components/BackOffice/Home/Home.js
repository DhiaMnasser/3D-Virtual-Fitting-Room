import React, { Component, Suspense } from 'react';  

// import Home from '../Home'  
import {  
    Route, Switch, Redirect  
} from 'react-router-dom';  
import ProductGrid from '../../Products/ProductGrid/Products';
import ProductList from '../../Products/ProductList/Products';
import CategoryList from '../../Categories/CategoryList/Categories';
import AddProductForm from '../../Forms/ProductForm/AddProduct/AddProductForm';
import AddCategoryForm from '../../Forms/CategoryForm/AddCategory/AddCategoryForm';

export class Home extends Component {  
 
    render() {  
        return (  
            <>
            <h2>this is home</h2>
            <ProductGrid/>
            <div className="row justify-content-md-center">
            <AddProductForm/>
            </div>
            <ProductList/>
            <CategoryList/>
            <div className="row justify-content-md-center">
            <AddCategoryForm/>
            </div>

            </> 
        )  
    }  
}  
  
export default Home 