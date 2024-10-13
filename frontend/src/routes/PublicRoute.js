import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  return (
    !user && !token ? (
      <Outlet />
    ) : (
      // If user and token are present, redirect to a protected route (e.g., /home)
      <Navigate
        to="/home"
        state={{ from: location }}
        replace
      />
    )
  );
};

export default PublicRoute;
