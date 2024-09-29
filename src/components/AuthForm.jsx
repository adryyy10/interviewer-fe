import React, { useState } from 'react';
import { Auth } from '../services/api';
import './AuthForm.css';

const AuthForm = ({ setIsAuthenticated }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleAuth = async (e) => {
        e.preventDefault();

        const encodedCredentials = btoa(`${email}:${password}`);
        try {
            const response = await Auth(encodedCredentials);
            if (response.status === 200) {
                const data = response.data;
                const apiKey = data.apiKey;

                localStorage.setItem('apiKey', apiKey);
                setIsAuthenticated(true);
            } else {
                setError('Invalid credentials. Please try again.');
            }
        } catch (err) {
            setError('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="auth-container">
            <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleAuth}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
            </form>
            <button className="toggle-button" onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Need to sign up?' : 'Already have an account? Log in'}
            </button>
        </div>
    );
};

export default AuthForm;
