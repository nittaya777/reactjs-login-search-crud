import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { ACCESS_TOKEN_NAME } from "../Constants";
function RequireAuth({ children }) {
  const authed = localStorage.getItem(ACCESS_TOKEN_NAME) !== null?true:false;
  const location = useLocation();

  return authed === true ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
}

export default RequireAuth;
