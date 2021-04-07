import React from "react";
import { Route, Redirect } from "react-router-dom";
import LayoutBack from "../components/BackOffice/Layout";
import { isAuthenticated } from "../redux/slices/auth";

// import { isAuthenticated } from "../helpers/authFetch";

const AdminRoute = ({ component: Component, ...rest }) => (
  <LayoutBack>
  <Route
    {...rest}
    render={props =>
      isAuthenticated() && isAuthenticated().result.role === 1 ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location }
          }}
        />
      )
    }
  />
  </LayoutBack>
);

export default AdminRoute;
