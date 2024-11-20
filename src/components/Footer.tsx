import { FC } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { Routes } from '../constants/routes';

const Footer: FC = () => {
  const renderLeftSection = () => (
    <div className="footer-left">
      <Link to={Routes.LandingPage} aria-label="Homepage">
        <span className="footer-logo">Interviewer</span>
      </Link>
      <p className="footer-description">
        Empowering you to ace your interviews with tailored questions and comprehensive preparation tools.
      </p>
    </div>
  );

  const renderCenterSection = () => (
    <div className="footer-center">
      <h3 className="footer-title">Quick Links</h3>
      <nav aria-label="Quick Links">
        <ul className="footer-links">
          <li><Link to={Routes.About}>About Us</Link></li>
          <li><Link to={Routes.Contacts}>Contact</Link></li>
          <li><Link to={Routes.faq}>FAQ</Link></li>
        </ul>
      </nav>
    </div>
  );

  const renderRightSection = () => (
    <div className="footer-right">
      <h3 className="footer-title">Follow Us</h3>
      <nav aria-label="Social Media Links" className="footer-social-icons">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <FaFacebookF />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
          <FaTwitter />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <FaLinkedinIn />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <FaInstagram />
        </a>
      </nav>
    </div>
  );

  const renderBottomSection = () => (
    <div className="footer-bottom">
      <p>&copy; {new Date().getFullYear()} Interviewer. All rights reserved.</p>
    </div>
  );

  return (
    <footer className="footer">
      <div className="footer-container">
        {renderLeftSection()}
        {renderCenterSection()}
        {renderRightSection()}
      </div>
      {renderBottomSection()}
    </footer>
  );
};

export default Footer;
