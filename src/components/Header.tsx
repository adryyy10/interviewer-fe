import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { useAuth } from '../hooks/AuthProvider';
import Logo from './Logo';
import { Routes } from '../constants/routes';

const Header: FC = () => {
    const { token, logOut } = useAuth();

    return (
        <header className="header">
            <div className="header-content">
                <div className="header-logo">
                    <Link to="/">
                        <Logo />
                    </Link>
                </div>

                <div className="header-user">
                    {token ? (
                        <div className="user-settings">
                            <Link to={Routes.Dashboard} className="dashboard-link">Dashboard</Link>
                            <button onClick={logOut} className="logout-button">
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="login-signup">
                            <Link to={Routes.Login} className="login-link">Login</Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
