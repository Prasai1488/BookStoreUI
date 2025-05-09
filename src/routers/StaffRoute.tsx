// src/routers/StaffRoute.tsx
import React, { type JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const StaffRoute = ({ children }: { children: JSX.Element }) => {
  const { currentUser } = useAuth();

  if (!currentUser) return <Navigate to="/login" replace />;

  if (currentUser.role !== "Staff") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default StaffRoute;
