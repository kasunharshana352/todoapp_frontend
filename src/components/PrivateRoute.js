import React from "react";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ element: Element, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem("token");

  if (isAuthenticated) {
    return <Route {...rest} element={<Element />} />;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default PrivateRoute;
