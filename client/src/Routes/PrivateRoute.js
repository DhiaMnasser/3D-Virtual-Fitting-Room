import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import LayoutFront from "../components/FrontOffice/Layout";
import { isAuthenticated } from '../redux/slices/auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <LayoutFront>
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
      // true ? (
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
  </LayoutFront>
);

export default PrivateRoute;
