import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";

const PublicRoute = () => {
    const { token, admin } = useAuth();

    if (!token) return <Outlet />;
    if (!admin) return <Navigate to="/" replace />;

    return <Navigate to="/dashboard" replace />;
};

export default PublicRoute;
