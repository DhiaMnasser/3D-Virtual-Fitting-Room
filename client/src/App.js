import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import LayoutBack from "./components/BackOffice/Layout";
import LayoutFront from "./components/FrontOffice/Layout";
// import Login from "./Login";
import Auth from './components/Auth/Auth';
import Form from './components/Forms/ClaimForm/AddClaim/AddClaimForm';
import Formrev from './components/Forms/ReviewForm/AddReview/AddReviewForm';
import reviews from './components/Reviews/Reviewlist/Reviews';
import Formup from './components/Forms/ReviewForm/UpdateReview/UpdateReviewForm';

import { BrowserRouter, HashRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getProducts } from "./redux/slices/products";
import { getCategories } from "./redux/slices/categories";
import { getClaims } from "./redux/slices/claims";
import { getAvatars } from "./redux/slices/avatars";
import { getOrders } from "./redux/slices/orders";
import { getReviews } from "./redux/slices/reviews";
import Navbar from './components/Navbar/Navbar';
import { getAllUsers, getUsers } from "./redux/slices/auth";
import Claims from './components/Claims/Claimlist/Claims';

function App() {

  const dispatch = useDispatch();
  useEffect(() => {
   dispatch(getProducts());
   dispatch(getCategories());
   dispatch(getClaims());
     dispatch(getAvatars());
       dispatch(getOrders());
         dispatch(getReviews());
dispatch(getUsers());
  }, [dispatch])


  const [connectedUser, setConnectedUser] = useState(null);

  return (
    <BrowserRouter basename="/">
      <Navbar />
    <Switch>
      <Route path="/admin">
        <LayoutBack />
      </Route>
      <Route path="/auth" exact component={Auth} />
      <Route path="/listclaim" exact component={Claims} />
      <Route path="/listreview" exact component={reviews} />
      <Route path="/">
      <Route path="/addclaim" exact component={Form} />
      <Route path="/addreview" exact component={Formrev} />
      <Route path="/updatereview/:value" exact component={Formup} />

   
        <LayoutFront />
        
      </Route>
      <Route
        
        render={() => (
          <p>Default rendered page! Welcome {connectedUser.name}</p>
        )}
      ></Route>
    </Switch>
    </BrowserRouter>
  );
}

export default App;
