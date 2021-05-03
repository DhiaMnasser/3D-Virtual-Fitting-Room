import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
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
import MyClaims from "./components/Claims/Claimlist/Myclaims";

import Reviews from "./components/Reviews/Reviewlist/Reviews";
import Orders from "./components/FrontOffice/Orders/OrderList/Orders";
import OrderDetails from "./components/FrontOffice/Orders/Order/Order";
import AddReviewForm from "./components/Forms/ReviewForm/AddReview/AddReviewForm";
import AddClaimForm from "./components/Forms/ClaimForm/AddClaim/AddClaimForm";
import UpdateReviewForm from "./components/Forms/ReviewForm/UpdateReview/UpdateReviewForm";

import AdminRoute from "./Routes/AdminRoute";
import ClientRoute from "./Routes/ClientRoute";
import PrivateRoute from "./Routes/PrivateRoute";
import { getNbPage, get9Products, getTopProducts } from "./redux/slices/products";
import { getProducts } from "./redux/slices/products";
import { getCategories } from "./redux/slices/categories";
import { getClaims } from "./redux/slices/claims";
import { getAvatars } from "./redux/slices/avatars";
import { getOrdersByUser, getOrders } from "./redux/slices/orders";
import { getReviews } from "./redux/slices/reviews";
import {  getUsers, isAuthenticated } from "./redux/slices/auth";
import Categories from "./components/Categories/Categories";
import ProductDetails from "./components/Products/ProductDetails/ProductDetails";
import Contact from "./components/FrontOffice/Contact/Contact";
import customizedAvatar from "./components/FrontOffice/Avatar/customizedAvatar";
import TakePicture from "./components/FrontOffice/Avatar/TakePicture";
import Users from "./components/Users/Userlist/Users";
import Profile from "./components/Profile/Profile";
import Formuser from "./components/Profile/updateProfile";
import AR from "./components/FrontOffice/AR/ARHolder";
import Chat from "./components/FrontOffice/Chatbot/Chat";
import Comparateur from "./components/Comparateur/Comparateur";
import NotFoundPage from "./components/FrontOffice/Help/NotFoundPage";
import Help from "./components/FrontOffice/Help/Help";
import ARHolder from "./components/FrontOffice/AR/ARHolder";
import ImgComp from "./components/Comparateur/ImgComp";
import Recommandation from "./components/Recommandation/Recommandation"
import loaderr from "./components/FrontOffice/Avatar/loadingobj";
import  Sketch from "./components/FrontOffice/Avatar/size";
import ChildComponen from "./components/FrontOffice/Avatar/RecommendationSize";
// import Chat from "./components/FrontOffice/Chatbot/Chat";

function App() {
  const login = useSelector(state => state.login);
  const [connectedUser, setConnectedUser] = useState(isAuthenticated()?.result);
  const dispatch = useDispatch();
  useEffect(() => {

    dispatch(getCategories());
    dispatch(getClaims());
    dispatch(getAvatars());
    dispatch(getReviews());
    dispatch(getTopProducts());
    dispatch(getNbPage());
    dispatch(get9Products());
    
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
        <Route path="/404" component={NotFoundPage} />
        <ClientRoute path="/" exact component={HomeFront} />
        <ClientRoute path="/Home" component={HomeFront} />
        <ClientRoute path="/Help" component={Help} />
        <ClientRoute path="/Shop" component={Shop} />
        <ClientRoute path="/avatar/" component={customizedAvatar} />
        <ClientRoute path="/AR/" component={ARHolder} />
        <ClientRoute path="/skin/" component={Recommandation} />
        <ClientRoute path="/TakePicture/" component={TakePicture} />
        <ClientRoute path="/chatbot/" component={Chat} />
        <ClientRoute path="/productDetails/:value" exact component={ProductDetails} />
        <ClientRoute path="/Contact/" exact component={Contact} />
        <ClientRoute path="/Basket/" component={Basket} />
         <ClientRoute path="/comImg/" component={ImgComp} />
        <PrivateRoute path="/addclaim" exact component={AddClaimForm} />
        <PrivateRoute path="/addreview" exact component={AddReviewForm} />
        <PrivateRoute path="/Myclaims" exact component={MyClaims} />
        <PrivateRoute path="/profile" exact component={Profile} />
        <PrivateRoute path="/updatereview/:value" exact component={UpdateReviewForm}/>
        <PrivateRoute path="/updateuser/:value" exact component={Formuser} />
        <PrivateRoute path="/Checkout/" component={Checkout} />
        <PrivateRoute path="/myOrders/" component={Orders} />
        <PrivateRoute path="/order/:value" exact component={OrderDetails} />
        <PrivateRoute path="/monavatar" exact component={loaderr} />
        <PrivateRoute path="/terminos" exact component={Sketch}  />
        <PrivateRoute path="/recom" exact component={ChildComponen}  />

        <AdminRoute exact path="/admin/" component={HomeBack} />
        <AdminRoute path="/admin/products" component={ProductList} />
        <AdminRoute path="/admin/categories" component={Categories} />
        <AdminRoute path="/admin/orders" component={Orders} />
        <AdminRoute path="/admin/addProduct" component={AddProduct} />
        <AdminRoute path="/admin/listclaim" exact component={Claims} />
        <AdminRoute path="/admin/listreview" exact component={Reviews} />
        <AdminRoute path="/admin/listuser" exact component={Users} />
        <AdminRoute path="/admin/comparateur" exact component={Comparateur} />
         <AdminRoute path="/admin/compImg" exact component={ImgComp} />
        {/* <ClientRoute path="*" component={HomeFront} /> */}
        <Redirect to="/404" />
      </Switch>
    </Router>
  );
}

export default App;
