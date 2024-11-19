import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { useAuth } from '../hooks/AuthProvider';
import Logo from './Logo';
import { Routes } from '../constants/routes';
import { FaTachometerAlt, FaClipboardList, FaSignOutAlt } from 'react-icons/fa';

const Header: FC = () => {
    const { token, logOut } = useAuth();

    return (
        <header className="header">
            <div className="header-content">
                <div className="header-logo">
                    <Link to="/" className='header-logo-link'>
                        <Logo />
                    </Link>
                </div>

                <div className="header-user">
                    {token ? (
                        <div className="user-menu">
                            <span className="user-menu-title">Settings</span>
                            <div className="user-dropdown">
                                <Link to={Routes.Dashboard} className="dropdown-item">
                                    <FaTachometerAlt className="dropdown-icon" /> Dashboard
                                </Link>
                                <Link to={Routes.MyQuizzes} className="dropdown-item">
                                    <FaClipboardList className="dropdown-icon" /> My Quizzes
                                </Link>
                                <button onClick={logOut} className="dropdown-item logout-button">
                                    <FaSignOutAlt className="dropdown-icon" /> Logout
                                </button>
                            </div>
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
