import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import LayoutBack from "./components/BackOffice/Layout";
import LayoutFront from "./components/FrontOffice/Layout";
// import Login from "./Login";
import Auth from './components/Auth/Auth';
import updateProductComponent from './components/Forms/ProductForm/UpdateProduct/UpdateProductForm';

import { BrowserRouter, HashRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getProducts, updateProduct } from "./redux/slices/products";
import { getCategories } from "./redux/slices/categories";
import { getClaims } from "./redux/slices/claims";
import { getAvatars } from "./redux/slices/avatars";
import { getOrders } from "./redux/slices/orders";
import { getReviews } from "./redux/slices/reviews";
import { getAllUsers, getUsers } from "./redux/slices/auth";

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
      <Route path="/admin" exact component={LayoutBack}/>
      <Route path="/auth" exact component={Auth} />
      {/* <Route path="/updateproduct/:id"
                    render={(props) => <updateProductComponent {...props} />}/> */}
      <Route path="/" exact component={LayoutFront}/>
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
