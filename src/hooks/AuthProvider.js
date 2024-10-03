import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth, signup } from "../services/api";
import { HttpStatusCode } from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("apiKey") || "");
    const navigate = useNavigate();
    const loginAction = async (data) => {
        try {
            const encodedCredentials = btoa(`${data.email}:${data.password}`);
            const response = await Auth(encodedCredentials);
            if (response.status === HttpStatusCode.Ok){
                const data = response.data;
                setToken(data.apiKey);
                localStorage.setItem("apiKey", data.apiKey);
                // TODO: if admin, go to new dashboard, else go to current location, not root
                (data.admin) ? navigate("/dashboard") : navigate("/questions");
                return;
            }
            throw new Error(response.message);
        } catch (err) {
            console.error(err);
        }
    };

    const signupAction = async (data) => {
        try {
            const response = await signup(data);
            if (response.status === HttpStatusCode.Created){
                const data = response.data;
                setToken(data.apiKey);
                localStorage.setItem("apiKey", data.apiKey);
                // TODO: if admin, go to new dashboard, else go to current location, not root
                (data.admin) ? navigate("/dashboard") : navigate("/");
                return;
            }
            throw new Error(response.message);
        } catch (error) {
            alert(error.message);
        }
    };

    const logOut = () => {
        setToken("");
        localStorage.removeItem("apiKey");
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ token, loginAction, signupAction, logOut }}>
            {children}
        </AuthContext.Provider>
    );

};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};