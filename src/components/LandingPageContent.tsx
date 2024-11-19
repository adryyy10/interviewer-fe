import { FC } from "react";
import { Link } from "react-router-dom";
import { Routes } from "../constants/routes";
import './LandingPageContent.css';

const LandingPageContent: FC = () => {
  return (
    <article className="landing-page-content">
      <h1 className="landing-page-content-title">Ace Your Interviews with Expert Questions!</h1>
      <p className="landing-page-content-description">
        Prepare for your next big opportunity with our tailored interview questions. Enhance your skills, gain confidence, and land your dream job.
      </p>
      <Link to={Routes.Quiz} className="landing-page-content-cta-button">
        Start Your Quiz
      </Link>
    </article>
  );
}

export default LandingPageContent;