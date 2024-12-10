import { FC } from 'react';
import './LandingPage.css';
import FAQ from './FAQ';
import LandingPageContent from './LandingPageContent';
import FeedbackForm from './FeedbackForm';
import Explanation from './Explanation';

const LandingPage: FC = () => {
  return (
    <section className="landing-page-container">
      <LandingPageContent />
      <Explanation />
      <FAQ />
      <FeedbackForm />
    </section>
  );
};

export default LandingPage;
