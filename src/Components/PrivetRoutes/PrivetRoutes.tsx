import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isTokenExpired } from "../../../lib/utilits";
import { Navigate } from "react-router-dom";
const ProtectedRoute = (props) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("usertoken");
  useEffect(() => {
    

    if (!token || isTokenExpired(token)) {
      // Redirect to login if no token or expired token
      console.log("yes")
      navigate("/Login");
    }else{
      console.log("noo")
    }
  }, [token]);
  if (localStorage.getItem("usertoken") !== null) {
    return props.children;
  } else {
    return <Navigate to={"/login"} />;
  }

  
};

export default ProtectedRoute;
