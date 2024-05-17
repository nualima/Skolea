import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <footer className="footer mt-auto py-3 bg-dark text-white">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h4>Contact</h4>
                        <p>
                            <FontAwesomeIcon icon={faMapMarkerAlt} /> 123 Main Street, Anytown, CA 12345<br />
                            <FontAwesomeIcon icon={faPhone} /> (123) 456-7890<br />
                            <FontAwesomeIcon icon={faEnvelope} /> <a href="mailto:redwan.gharbi@example.com" className="text-white">redwan.gharbi@example.com</a>
                        </p>
                    </div>
                    <div className="col-md-4">
                        <h4>Follow Us</h4>
                        <p>
                            <a href="https://www.facebook.com" className="text-white me-2">
                                <FontAwesomeIcon icon={faFacebook} size="2x" />
                            </a>
                            <a href="https://www.twitter.com" className="text-white me-2">
                                <FontAwesomeIcon icon={faTwitter} size="2x" />
                            </a>
                            <a href="https://www.linkedin.com" className="text-white">
                                <FontAwesomeIcon icon={faLinkedin} size="2x" />
                            </a>
                        </p>
                    </div>
                    <div className="col-md-4">
                        <h4>Legal</h4>
                        <ul className="list-unstyled">
                            <li><Link to="/privacy" className="text-white">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="text-white">Terms of Service</Link></li>
                            <li><Link to="/about" className="text-white">About Us</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="text-center mt-3">
                    <p>Copyright &copy; 2023 Redwan Gharbi</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
