import { FC } from 'react';
import './LandingPage.css';
import FAQ from './FAQ';
import LandingPageContent from './LandingPageContent';

const LandingPage: FC = () => {
  return (
    <section className="landing-page-container">
      <LandingPageContent />
      <FAQ />
    </section>
  );
};

export default LandingPage;
