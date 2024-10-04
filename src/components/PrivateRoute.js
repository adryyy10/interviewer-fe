import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";

const PrivateRoute = () => {
    const { token, admin } = useAuth();
    if (!token) return <Navigate to="/login" />;
    if (!admin) return <Navigate to="/" />;
    return <Outlet />;
};

export default PrivateRoute;