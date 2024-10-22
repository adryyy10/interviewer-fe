import React, { FC, ReactElement } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";
import { Routes } from "../constants/routes";

const PublicRoute: FC = (): ReactElement => {
    const { token, admin } = useAuth();

    if (!token) return <Outlet />;
    if (!admin) return <Navigate to={Routes.LandingPage} replace />;

    return <Navigate to={Routes.Dashboard} replace />
};

export default PublicRoute;