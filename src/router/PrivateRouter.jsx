import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthContext } from "../context/AuthProvider";

const PrivateRouter = () => {
  const { user } = useAuthContext();

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRouter;
