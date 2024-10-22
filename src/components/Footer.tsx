// src/components/Footer.tsx

import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { Routes } from '../constants/routes';

const Footer: FC = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-left">
                    <Link to={Routes.LandingPage}>
                        <span className="footer-logo">Interviewer</span>
                    </Link>
                    <p className="footer-description">
                        Empowering you to ace your interviews with tailored questions and comprehensive preparation tools.
                    </p>
                </div>

                <div className="footer-center">
                    <h3>Quick Links</h3>
                    <ul className="footer-links">
                        {/** TODO: About & Contact */}
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                        <li><Link to={Routes.faq}>FAQ</Link></li>
                    </ul>
                </div>

                {/* Right Section: Social Media Links */}
                <div className="footer-right">
                    <h3>Follow Us</h3>
                    <div className="footer-social-icons">
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
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Interviewer. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
