/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/*=====================================================
Imports
=====================================================*/
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

/*=====================================================
AuthRequired
=====================================================*/
const AuthRequired = () => {
  /*==================================
  Local storage & location
  ==================================*/
  // A simple authentication system checking if the 
  // key "loggedin" exists in the local storage
  const isLoggedIn = localStorage.getItem("loggedin");
  const location = useLocation();

  /*==================================
  JSX
  ==================================*/
  if (!isLoggedIn) {
    return (
      <Navigate 
        to="/login" 
        state={{from: location.pathname, message: "You must log in first"}}
        replace
      />
    )
  }

  return (<Outlet />);
}
export default AuthRequired;