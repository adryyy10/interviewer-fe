import React, { FC, ReactElement } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";
import { Routes } from "../constants/routes";

const PrivateRoute: FC = (): ReactElement => {
    const { token, admin } = useAuth();

    if (!token) {
        return <Navigate to={Routes.Login} replace />;
    }

    if (!admin) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default PrivateRoute;