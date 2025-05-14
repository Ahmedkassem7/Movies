import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const userData = JSON.parse(localStorage.getItem("user"));
  console.log("userData", userData);

  if (!userData) {
    return <Navigate to="/login" replace />;
  }

  if (userData.role === "admin") {
    return <Outlet />;
  }
  return <Navigate to="/home" replace />;
}
