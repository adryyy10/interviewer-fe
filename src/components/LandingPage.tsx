import { FC } from 'react';
import './LandingPage.css';
import FAQ from './FAQ';
import LandingPageContent from './LandingPageContent';
import FeedbackForm from './FeedbackForm';

const LandingPage: FC = () => {
  return (
    <section className="landing-page-container">
      <LandingPageContent />
      <FAQ />
      <FeedbackForm />
    </section>
  );
};

export default LandingPage;
