import React from "react";
import { Route, Redirect } from "react-router-dom";
import LayoutFront from "../components/FrontOffice/Layout";
import { isAuthenticated } from "../redux/slices/auth";

const ClientRoute = ({ component: Component, ...rest }) => (
  <LayoutFront>
  <Route
    {...rest}
    render={props =>
      <Component {...props} />
    }
  />
  </LayoutFront>
);

export default ClientRoute;
