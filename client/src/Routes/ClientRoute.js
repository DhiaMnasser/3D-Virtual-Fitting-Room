import React from "react";
import { Route, Redirect } from "react-router-dom";
import LayoutFront from "../components/FrontOffice/Layout";

// import { isAuthenticated } from "../helpers/authFetch";

const ClientRoute = ({ component: Component, ...rest }) => (
  <LayoutFront>
  <Route
    // {...rest}
    render={props =>
      // isAuthenticated() && isAuthenticated().user.role === 1 ? (
    //  true ? (
        <Component {...props} />
      // ) : (
        // <Redirect
          // to={{
            // pathname: "/",
            // state: { from: props.location }
          // }}
        // />
      // )
    }
  />
  </LayoutFront>
);

export default ClientRoute;
