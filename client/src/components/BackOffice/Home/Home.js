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
import AddClaimForm from '../../Forms/ClaimForm/AddClaim/AddClaimForm';


export class Home extends Component {  
 
    render() {  
        return (  
            <>
            <h2>this is home</h2>
            <ProductGrid/>
            <div className="row justify-content-md-center">
            <AddProductForm/>
            </div>
            <div className="row justify-content-md-center">
            <AddClaimForm/>
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