import { useState } from "react";
import { useAuth } from "../hooks/AuthProvider";
import "./Login.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const auth = useAuth();

    // Function to handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Clear the error message for the current field
        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    // Function to validate form inputs
    const validate = () => {
        const newErrors = {};
        let isValid = true;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!input.email) {
            newErrors.email = "Email is required.";
            isValid = false;
        } else if (!emailRegex.test(input.email)) {
            newErrors.email = "Please enter a valid email address.";
            isValid = false;
        }

        if (!input.password) {
            newErrors.password = "Password is required.";
            isValid = false;
        } else if (input.password.length < 4) {
            newErrors.password = "Password must be at least 4 characters long.";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            auth.loginAction(input);
        }
    };

    // Function to toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit} noValidate>
                <h2 className="form-title">Login</h2>

                <div className="form-control">
                    <label htmlFor="user-email">Email:</label>
                    <input
                        type="email"
                        id="user-email"
                        name="email"
                        placeholder="example@yahoo.com"
                        value={input.email}
                        onChange={handleInputChange}
                        aria-describedby="email-error"
                        aria-invalid={errors.email ? "true" : "false"}
                        required
                    />
                    {errors.email && (
                        <span id="email-error" className="error-message">
                            {errors.email}
                        </span>
                    )}
                </div>

                <div className="form-control password-control">
                    <label htmlFor="password">Password:</label>
                    <div className="password-input-wrapper">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            value={input.password}
                            onChange={handleInputChange}
                            aria-describedby="password-error"
                            aria-invalid={errors.password ? "true" : "false"}
                            required
                        />
                        <button
                            type="button"
                            className="password-toggle-btn"
                            onClick={togglePasswordVisibility}
                            aria-label={
                                showPassword
                                    ? "Hide password"
                                    : "Show password"
                            }
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    {errors.password && (
                        <span id="password-error" className="error-message">
                            {errors.password}
                        </span>
                    )}
                </div>

                <button type="submit" className="btn-submit">
                    Submit
                </button>

                <p className="toggle-auth">
                    Don't have an account?{" "}
                    <Link className="toggle-auth-a" to="/signup">Signup here</Link>.
                </p>
            </form>
        </div>
    );
};

export default Login;