import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logo from "./logo.svg";
import "./App.css";
import LayoutBack from "./components/BackOffice/Layout";
import LayoutFront from "./components/FrontOffice/Layout";
import Basket from "./components/FrontOffice/Basket/Basket";
import Auth from "./components/Auth/Auth";
import HomeFront from "./components/FrontOffice/Home/Home";
import HomeBack from "./components/BackOffice/Home/Home";
import Shop from "./components/Products/ProductGrid/Shop";
import Checkout from "./components/FrontOffice/Checkout/Checkout";
import AddProduct from "./components/Forms/ProductForm/AddProduct/AddProductForm";
import Claims from "./components/Claims/Claimlist/Claims";
import ProductList from "./components/Products/ProductList/Products";

import Reviews from "./components/Reviews/Reviewlist/Reviews";
import OrderListAdmin from "./components/FrontOffice/Orders/OrderList/Orders";
import AddReviewForm from "./components/Forms/ReviewForm/AddReview/AddReviewForm";
import AddClaimForm from "./components/Forms/ClaimForm/AddClaim/AddClaimForm";
import UpdateReviewForm from "./components/Forms/ReviewForm/UpdateReview/UpdateReviewForm";

import AdminRoute from "./Routes/AdminRoute";
import ClientRoute from "./Routes/ClientRoute";
import PrivateRoute from "./Routes/PrivateRoute";

import { getProducts } from "./redux/slices/products";
import { getCategories } from "./redux/slices/categories";
import { getClaims } from "./redux/slices/claims";
import { getAvatars } from "./redux/slices/avatars";
import { getOrdersByUser, getOrders } from "./redux/slices/orders";
import { getReviews } from "./redux/slices/reviews";
import { getAllUsers, getUsers, isAuthenticated } from "./redux/slices/auth";
import Categories from "./components/Categories/Categories";
import ProductDetails from "./components/Products/ProductDetails/ProductDetails";
import Contact from "./components/FrontOffice/Contact/Contact";

function App() {
  const login = useSelector(state => state.login);
  const [connectedUser, setConnectedUser] = useState(isAuthenticated()?.result);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
    dispatch(getClaims());
    dispatch(getAvatars());
    dispatch(getReviews());
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    
    if (connectedUser) { 
      connectedUser.role === 0 ?
    dispatch(getOrdersByUser())
    :
    dispatch(getOrders())
    }
    
  },[connectedUser]);

  useEffect(()=>{
    setConnectedUser(isAuthenticated()?.result)

  }, [login])

  return (
    <Router>
      <Switch>
        <Route path="/auth" exact component={Auth} />

        <ClientRoute path="/" exact component={HomeFront} />
        <ClientRoute path="/Home" component={HomeFront} />
        <ClientRoute path="/Shop" component={Shop} />
        <ClientRoute path="/Basket/" component={Basket} />
        <ClientRoute path="/Checkout/" component={Checkout} />

        <PrivateRoute path="/addclaim" exact component={AddClaimForm} />
        <PrivateRoute path="/addreview" exact component={AddReviewForm} />
        <PrivateRoute
          path="/updatereview/:value"
          exact
          component={UpdateReviewForm}
        />
        <ClientRoute
          path="/productDetails/:value"
          exact
          component={ProductDetails}
        />
        <ClientRoute
          path="/Contact/"
          exact
          component={Contact}
        />

        <AdminRoute exact path="/admin/" component={HomeBack} />
        <AdminRoute path="/admin/products" component={ProductList} />
        <AdminRoute path="/admin/categories" component={Categories} />
        <AdminRoute path="/admin/orders" component={OrderListAdmin} />
        <AdminRoute path="/admin/addProduct" component={AddProduct} />
        <AdminRoute path="/admin/listclaim" exact component={Claims} />
        <AdminRoute path="/admin/listreview" exact component={Reviews} />

        <ClientRoute path="*" component={HomeFront} />
      </Switch>
    </Router>
  );
}

export default App;
