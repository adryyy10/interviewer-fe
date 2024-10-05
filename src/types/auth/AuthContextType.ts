import { LoginData } from "./LoginData";
import { SignupData } from "./SignupData";

export interface AuthContextType {
    token: string;
    admin: boolean;
    loginAction: (data: LoginData) => Promise<void>;
    signupAction: (data: SignupData) => Promise<void>;
    logOut: () => void;
}