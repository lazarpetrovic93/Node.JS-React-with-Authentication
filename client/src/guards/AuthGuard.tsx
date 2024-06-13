import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../helpers";

const AuthGuard = ({ children }: { children: JSX.Element }): JSX.Element => {
  const isAuth = isAuthenticated();
  if (!isAuth) {
    // User is authenticated, prevent access to /authentication/login route
    return <Navigate to="/authentication/login" replace />;
  }

  // User is not authenticated, allow access to children
  return children;
};

export default AuthGuard;
