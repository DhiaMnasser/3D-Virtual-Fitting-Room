import React, { Component, Suspense } from 'react';  

// import Home from '../Home'  
import {  
    Route, Switch, Redirect  
} from 'react-router-dom';  
import ProductGrid from '../../Products/ProductGrid/Products';
import ProductList from '../../Products/ProductList/Products';
// import CategoryList from '../../Categories/CategoryList/Categories';
import AddProductForm from '../../Forms/ProductForm/AddProduct/AddProductForm';
import AddCategoryForm from '../../Forms/CategoryForm/AddCategory/AddCategoryForm';
import Analytics from '../../Extras/Analytics/Analytics';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Stats from '../../Extras/Stats/Stats';

export class Home extends Component {  
 
    render() {  
        NotificationManager.success('Admin', 'Welcome'); 

        return ( 
             
            <>
            <NotificationContainer />
            <h2><strong>Admin Dashboard</strong></h2>
            <Stats></Stats>
            <Analytics></Analytics>
            {/* <ProductGrid/> */}
            <div className="row justify-content-md-center">
            {/* <AddProductForm/> */}
            </div>
            {/* <ProductList/> */}
            {/* <CategoryList/> */}
            <div className="row justify-content-md-center">
            {/* <AddCategoryForm/> */}
            </div>

            </> 
        )  
    }  
}  
  
export default Home 