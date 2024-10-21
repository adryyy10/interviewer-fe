import React, { createContext, useContext, useState, FC, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Auth, signup } from "../services/api";
import { HttpStatusCode } from "axios";
import { AuthContextType } from "../types/auth/AuthContextType";
import { LoginData } from "../types/auth/LoginData";
import { SignupData } from "../types/auth/SignupData";
import { ApiResponse } from "../types/api/ApiResponse";
import { Routes } from "../constants/routes";

// Create the context with default undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string>(localStorage.getItem("apiKey") || "");
    const [admin, setAdmin] = useState<boolean>(localStorage.getItem("admin") === "true");
    const navigate = useNavigate();

    const loginAction = async (data: LoginData): Promise<void> => {
        try {
            const encodedCredentials = btoa(`${data.email}:${data.password}`);
            const response: ApiResponse<{ apiKey: string; admin: boolean }> = await Auth(encodedCredentials);
            if (response.status === HttpStatusCode.Ok) {
                const responseData = response.data;
                setToken(responseData.apiKey);
                localStorage.setItem("apiKey", responseData.apiKey);
                setAdmin(responseData.admin);
                localStorage.setItem("admin", responseData.admin.toString());
                responseData.admin ? navigate(Routes.Dashboard) : navigate(Routes.Main);
                return;
            }
            throw new Error(response.statusText);
        } catch (err: any) {
            console.error(err);
        }
    };

    const signupAction = async (data: SignupData): Promise<void> => {
        try {
            const response: ApiResponse<{ apiKey: string; admin: boolean }> = await signup(data);
            if (response.status === HttpStatusCode.Created) {
                const responseData = response.data;
                setToken(responseData.apiKey);
                localStorage.setItem("apiKey", responseData.apiKey);
                setAdmin(responseData.admin);
                localStorage.setItem("admin", responseData.admin.toString());
                responseData.admin ? navigate(Routes.Dashboard) : navigate(Routes.Main);
                return;
            }
            throw new Error(response.statusText);
        } catch (error: any) {
            console.error(error);
            alert(error.message);
        }
    };

    const logOut = (): void => {
        setToken("");
        setAdmin(false);
        localStorage.removeItem("apiKey");
        localStorage.removeItem("admin");
        navigate(Routes.Login);
    };

    return (
        <AuthContext.Provider value={{ token, admin, loginAction, signupAction, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

// Custom hook to use the Auth Context
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
