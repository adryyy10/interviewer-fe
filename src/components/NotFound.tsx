import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';
import { Routes } from '../constants/routes';

const NotFound: FC = () => {
    return (
        <div className="notfound-container">
            <h1 className="notfound-title">404</h1>
            <p className="notfound-message">Oops! The page you're looking for doesn't exist.</p>
            <Link to={Routes.LandingPage} className="notfound-link">
                Go Back Home
            </Link>
        </div>
    );
};

export default NotFound;
