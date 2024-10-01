import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "../services/api";
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
                (data.admin) ? navigate("/admin/questions") : navigate("/");
                return;
            }
            throw new Error(response.message);
        } catch (err) {
            console.error(err);
        }
    };

    const logOut = () => {
        setToken("");
        localStorage.removeItem("apiKey");
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ token, loginAction, logOut }}>
            {children}
        </AuthContext.Provider>
    );

};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};