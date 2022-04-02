import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { ACCESS_TOKEN_NAME } from "../../Constants";

const Logout = (props) => {
  let location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const authed =
      localStorage.getItem(ACCESS_TOKEN_NAME) !== null ? true : false;
    if (authed === true) {
      localStorage.removeItem(ACCESS_TOKEN_NAME);
      props.setIsLoggedIn(false);
      navigate("/");
    }
    return null;
  }, []);

  return null;
};
export default Logout;
