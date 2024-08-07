// src/components/ProtectedRoute.js
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { userInfo } = useSelector((state) => state.user);

  return userInfo ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;

