import React from "react";
import { Route, Redirect } from "react-router-dom";
const PrivateRoute = ({ isLoggedin, path, component: Component }) => {
  return (
    <Route
      exact
      path={path}
      render={(props) => {
        return isLoggedin ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: {
                from: props.location,
              },
            }}
          />
        );
      }}
    />
  );
};
export default PrivateRoute;
