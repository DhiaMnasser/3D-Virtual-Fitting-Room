import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import LayoutBack from "./components/BackOffice/Layout";
import LayoutFront from "./components/FrontOffice/Layout";
// import Login from "./Login";
import Auth from './components/Auth/Auth';

import { BrowserRouter, HashRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getProducts } from "./redux/slices/products";
import { getCategories } from "./redux/slices/categories";
import { getClaims } from "./redux/slices/claims";
import { getAvatars } from "./redux/slices/avatars";
import { getOrders } from "./redux/slices/orders";
import { getReviews } from "./redux/slices/reviews";
import { getAllUsers, getUsers } from "./redux/slices/auth";
import Basket from "./components/FrontOffice/Basket/Basket";

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
    <Switch>
      <Route path="/admin">
        <LayoutBack />
      </Route>
      <Route path="/auth" exact component={Auth} />
      <Route path="/basket" exact component={Basket} />
      <Route path="/">
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
