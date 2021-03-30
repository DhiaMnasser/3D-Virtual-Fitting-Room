import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import logo from "./logo.svg";
import "./App.css";
import LayoutBack from "./components/BackOffice/Layout";
import LayoutFront from "./components/FrontOffice/Layout";
import Basket from "./components/FrontOffice/Basket/Basket";
import Auth from "./components/Auth/Auth";
import HomeFront from "./components/FrontOffice/Home/Home";
import HomeBack from "./components/BackOffice/Home/Home";
import Shop from "./components/FrontOffice/Shop/Shop";
import Checkout from "./components/FrontOffice/Checkout/Checkout";
import AddProduct from "./components/Forms/ProductForm/AddProduct/AddProductForm";
import AdminRoute from "./Routes/AdminRoute";
import ClientRoute from "./Routes/ClientRoute";

import { getProducts } from "./redux/slices/products";
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
  }, [dispatch]);

  const [connectedUser, setConnectedUser] = useState(null);

  return (
    // <BrowserRouter basename="/">
    // <Switch>
    //   <Route path="/admin">
    //     <LayoutBack />
    //   </Route>
    //   <Route path="/auth" exact component={Auth} />
    //   <Route path="/basket" exact component={Basket} />
    //   <Route path="/">
    //     <LayoutFront />
    //   </Route>
    //   <Route

    //     render={() => (
    //       <p>Default rendered page! Welcome {connectedUser.name}</p>
    //     )}
    //   ></Route>
    // </Switch>
    // </BrowserRouter>

    <Router >
      <Switch>
        <Route path="/auth" component={Auth} />

        {/* <Route path="/admin/:path?" exact>
          <LayoutBack>
            <Switch>
              <Route path="/admin" exact component={HomeBack} />
              <Route path="/admin/addProduct" component={AddProduct} />
              <Route path="/admin/hello" component={Hello} />
            </Switch>
          </LayoutBack>
        </Route>

        <Route  >
          <LayoutFront>
            <Switch>
              <Route path='/' exact component={HomeFront} />
              <Route path='/Home/' exact component={HomeFront} />
              <Route path='/Shop/' exact component={Shop} />
              <Route path='/Basket/' component={Basket} />
            </Switch>
          </LayoutFront>
        </Route> */}

        <ClientRoute exact path="/"  component={HomeFront} />
        <ClientRoute  path="/home/"  component={HomeFront} />
        <ClientRoute  path="/shop/"  component={Shop} />
        <ClientRoute  path="/basket/"  component={Basket} />
        <ClientRoute  path="/checkout/"  component={Checkout} />
        {/* <Route path='/admin/' exact>
          <AdminRoute exact path="/addProduct"  component={AddProduct} />
          <AdminRoute exact path="" component={HomeBack} />
        </Route> */}
      </Switch>
    </Router>
  );
}

export default App;
