import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import FAQ from './FAQ';

const LandingPage: FC = () => {
    return (
        <div className="landing-page-container">
            <div className="landing-page-content">
                <h1 className="landing-page-title">Ace Your Interviews with Expert Questions!</h1>
                <p className="landing-page-description">
                    Prepare for your next big opportunity with our tailored interview questions. Enhance your skills, gain confidence, and land your dream job.
                </p>
                <Link to="/quiz" className="landing-page-cta-button">
                    Start Your Quiz
                </Link>
            </div>

            <FAQ />
        </div>
    );
};

export default LandingPage;
