import React from "react";
import { Route, Redirect } from "react-router-dom";
import LayoutBack from "../components/BackOffice/Layout";

// import { isAuthenticated } from "../helpers/authFetch";

const AdminRoute = ({ component: Component, ...rest }) => (
  <LayoutBack>
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
  </LayoutBack>
);

export default AdminRoute;
