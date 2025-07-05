import  { type JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const { currentUser, loading } = useAuth();

  // ✅ Wait until loading completes — don't render or redirect yet
  if (loading) return <div className="text-center mt-20">Loading...</div>;

  // ✅ If no user or wrong role, redirect
  if (!currentUser) return <Navigate to="/login" replace />;
  if (currentUser.role !== "Admin") return <Navigate to="/" replace />;

  // ✅ Authorized
  return children;
};

export default AdminRoute;
