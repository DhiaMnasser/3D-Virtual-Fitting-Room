import React, { Component, Suspense } from 'react';
// import Leftside from './Leftside/Leftside';
import Header from './Header/Header';
import Footer from './Footer/Footer';
// import Home from './Home/Home';
import { Route, Switch, Redirect } from 'react-router-dom';
import products, { addProduct } from '../../redux/slices/products';
import ProductGrid from '../Products/ProductGrid/Products';
import ProductList from '../Products/ProductList/Products';
import Form from '../Forms/ProductForm/AddProduct/AddProductForm';


export class Layout extends Component {

  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );
  render() {
    return (
      <div>
        <div id="wrapper">
          {/* <Leftside></Leftside> */}
          <div id="content-wrapper" class="d-flex flex-column">
            <div id="content">
              <Header />
              {/* <Home /> */}
              <Form></Form>
<ProductGrid></ProductGrid>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    );
  }
};

export default Layout;
