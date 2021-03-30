import React from 'react';
import { Route, Redirect } from 'react-router-dom';
// import { isAuthenticated } from '../helpers/authFetch';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      // isAuthenticated() ? (
      true ? (
      <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/signin',
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

export default PrivateRoute;
