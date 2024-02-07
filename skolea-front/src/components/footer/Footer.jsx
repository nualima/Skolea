import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h4>Contact</h4>
                        <p>
                            Redwan Gharbi<br />
                            123 Main Street<br />
                            Anytown, CA 12345<br />
                            (123) 456-7890<br />
                            <a href="mailto:redwan.gharbi@example.com">redwan.gharbi@example.com</a>
                        </p>
                    </div>
                    <div className="col-md-6">
                        <h4>Links</h4>
                        <ul className="list-unstyled">
                            <li><Link to="/home">Home</Link></li>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                            <li><Link to="/profil">profil</Link></li>
                            <li><Link to="/reservation">reservation</Link></li>
                            <li><Link to="/availability">availability</Link></li>

                        </ul>
                    </div>
                </div>
                <div className="text-center">
                    <p>Copyright &copy; 2023 Redwan Gharbi</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
