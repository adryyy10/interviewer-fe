import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth, signup } from "../services/api";
import { HttpStatusCode } from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("apiKey") || "");
    const [admin, setAdmin] = useState(localStorage.getItem("admin") === "true");
    const navigate = useNavigate();

    const loginAction = async (data) => {
        try {
            const encodedCredentials = btoa(`${data.email}:${data.password}`);
            const response = await Auth(encodedCredentials);
            if (response.status === HttpStatusCode.Ok){
                const responseData = response.data;
                setToken(responseData.apiKey);
                localStorage.setItem("apiKey", responseData.apiKey);
                setAdmin(responseData.admin);
                localStorage.setItem("admin", responseData.admin);
                responseData.admin ? navigate("/dashboard") : navigate("/");
                return;
            }
            throw new Error(response.message);
        } catch (err) {
            console.error(err);
            // Optionally, handle error state here
        }
    };

    const signupAction = async (data) => {
        try {
            const response = await signup(data);
            if (response.status === HttpStatusCode.Created){
                const responseData = response.data;
                setToken(responseData.apiKey);
                localStorage.setItem("apiKey", responseData.apiKey);
                setAdmin(responseData.admin);
                localStorage.setItem("admin", responseData.admin);
                responseData.admin ? navigate("/dashboard") : navigate("/");
                return;
            }
            throw new Error(response.message);
        } catch (error) {
            alert(error.message);
            // Optionally, handle error state here
        }
    };

    const logOut = () => {
        setToken("");
        setAdmin(false);
        localStorage.removeItem("apiKey");
        localStorage.removeItem("admin");
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ token, admin, loginAction, signupAction, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};
