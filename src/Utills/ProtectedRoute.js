import React, { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useGlobalContext } from "../Context";

const ProtectedRoute = ({ children }) => {
  const { authToken } = useGlobalContext();

  if (!authToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
