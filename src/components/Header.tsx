import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { useAuth } from '../hooks/AuthProvider';
import Logo from './Logo';
import { Routes } from '../constants/routes';
import { FaTachometerAlt, FaClipboardList, FaSignOutAlt } from 'react-icons/fa';

const Header: FC = () => {
  const { token, logOut } = useAuth();

  const renderUserMenu = () => (
    <nav aria-label="User Menu" className="user-menu">
      <span className="user-menu-title">Settings</span>
      <ul className="user-dropdown">
        <li className="dropdown-item">
          <Link to={Routes.Dashboard} className="dropdown-link">
            <FaTachometerAlt className="dropdown-icon" /> Dashboard
          </Link>
        </li>
        <li className="dropdown-item">
          <Link to={Routes.MyQuizzes} className="dropdown-link">
            <FaClipboardList className="dropdown-icon" /> My Quizzes
          </Link>
        </li>
        <li className="dropdown-item">
          <button onClick={logOut} className="dropdown-link logout-button">
            <FaSignOutAlt className="dropdown-icon" /> Logout
          </button>
        </li>
      </ul>
    </nav>
  );

  const renderLoginMenu = () => (
    <nav aria-label="Login Menu" className="login-signup">
      <Link to={Routes.Login} className="login-link">Login</Link>
    </nav>
  );

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-logo">
          <Link to="/" className="header-logo-link" aria-label="Homepage">
            <Logo />
          </Link>
        </div>
        <div className="header-user">
          {token ? renderUserMenu() : renderLoginMenu()}
        </div>
      </div>
    </header>
  );
};

export default Header;
