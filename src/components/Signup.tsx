import React, { useState, ChangeEvent, FormEvent, FC } from "react";
import { useAuth } from "../hooks/AuthProvider";
import "./Signup.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { SignupData, FormErrors } from "../types";
import { Routes } from "../constants/routes";

const Signup: FC = () => {
    const [input, setInput] = useState<SignupData>({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState<FormErrors>({});

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const auth = useAuth();

    // Handle input changes
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
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

    // Validate form inputs
    const validate = (): boolean => {
        const newErrors: FormErrors = {};
        let isValid = true;

        const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!input.username) {
            newErrors.username = "Username is required.";
            isValid = false;
        }

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

        if (!input.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password.";
            isValid = false;
        } else if (input.password !== input.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match.";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    // Handle form submission
    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        if (validate()) {
            await auth.signupAction(input);
        }
    };

    // Toggle password visibility
    const togglePasswordVisibility = (): void => {
        setShowPassword((prev) => !prev);
    };

    return (
        <div className="signup-container">
            <form className="signup-form" onSubmit={handleSubmit} noValidate>
                <h2 className="form-title">Signup</h2>

                <div className="form-control">
                    <label htmlFor="signup-username">Username:</label>
                    <input
                        id="signup-username"
                        name="username"
                        value={input.username}
                        onChange={handleInputChange}
                        aria-describedby="signup-username-error"
                        aria-invalid={errors.username ? "true" : "false"}
                        required
                    />
                    {errors.username && (
                        <span id="signup-username-error" className="error-message">
                            {errors.username}
                        </span>
                    )}
                </div>

                <div className="form-control">
                    <label htmlFor="signup-email">Email:</label>
                    <input
                        type="email"
                        id="signup-email"
                        name="email"
                        placeholder="example@yahoo.com"
                        value={input.email}
                        onChange={handleInputChange}
                        aria-describedby="signup-email-error"
                        aria-invalid={errors.email ? "true" : "false"}
                        required
                    />
                    {errors.email && (
                        <span id="signup-email-error" className="error-message">
                            {errors.email}
                        </span>
                    )}
                </div>

                <div className="form-control password-control">
                    <label htmlFor="signup-password">Password:</label>
                    <div className="password-input-wrapper">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="signup-password"
                            name="password"
                            value={input.password}
                            onChange={handleInputChange}
                            aria-describedby="signup-password-error"
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
                        <span id="signup-password-error" className="error-message">
                            {errors.password}
                        </span>
                    )}
                </div>

                <div className="form-control password-control">
                    <label htmlFor="confirm-password">Confirm Password:</label>
                    <div className="password-input-wrapper">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="confirm-password"
                            name="confirmPassword"
                            value={input.confirmPassword}
                            onChange={handleInputChange}
                            aria-describedby="signup-confirm-password-error"
                            aria-invalid={errors.confirmPassword ? "true" : "false"}
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
                    {errors.confirmPassword && (
                        <span id="signup-confirm-password-error" className="error-message">
                            {errors.confirmPassword}
                        </span>
                    )}
                </div>

                <button type="submit" className="btn-submit">
                    Signup
                </button>

                <p className="toggle-auth">
                    Already have an account?{" "}
                    <Link className="toggle-auth-a" to={Routes.Login}>Login here</Link>.
                </p>
            </form>
        </div>
    );
};

export default Signup;
