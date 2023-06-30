import React from "react";
import ReactDOM from "react-dom";

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
                            <li><a href="#">Home</a></li>
                            <li><a href="#">About</a></li>
                            <li><a href="#">Services</a></li>
                            <li><a href="#">Contact</a></li>
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
