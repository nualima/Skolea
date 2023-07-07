import React from "react";
import { useState, useEffect } from "react";
import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import './navbar.scss';

const NavbarTest = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [size, setSize] = useState({
        width: 0,
        height: 0,
    });

    const [isScrolled, setIsScrolled] = useState(false); // New state for scroll position

    const [isAuthenticated, setIsAuthenticated] = useState(false); // New state for client authentication

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0); // Check if scrolled down
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (size.width > 768 && menuOpen) {
            setMenuOpen(false);
        }
    }, [size.width, menuOpen]);

    const menuToggleHandler = () => {
        setMenuOpen((p) => !p);
    };

    useEffect(() => {
        // Check client authentication status here
        const clientIsAuthenticated = true; // Replace with your authentication logic
        setIsAuthenticated(clientIsAuthenticated);
    }, []);

    const handleLogout = () => {
        // Add logout logic here
        setIsAuthenticated(false);
    };

    return (
        <header className={`header ${isScrolled ? "header--blue" : ""}`}>
            <div className="header__content">
                <span className="header__content__logo">Navbar</span>
                <nav className="header__content__nav">
                    <ul>
                        <li>
                            <a href="/">Home</a>
                        </li>
                        {isAuthenticated && (
                            <>
                                <li>
                                    <a href="/profilePage">Profile</a>
                                </li>
                                <li>
                                    <a href="/subject">Reservation</a>
                                </li>
                            </>
                        )}
                        <li>
                            <a href="/contact">Contact</a>
                        </li>
                        {isAuthenticated ? (
                            <button className="btn" onClick={handleLogout}>
                                Se déconnecter
                            </button>
                        ) : (
                            <>
                                <a href="/newUserForm">
                                    <button className="btn">Inscription</button>
                                </a>
                                <a href="/loginPage">
                                    <button className="btn btn__login">Connexion</button>
                                </a>
                            </>
                        )}
                    </ul>
                </nav>
                <div className="header__content__toggle">
                    {!menuOpen ? (
                        <BiMenuAltRight onClick={menuToggleHandler} />
                    ) : (
                        <AiOutlineClose onClick={menuToggleHandler} />
                    )}
                </div>
            </div>
        </header>
    );
};

export default NavbarTest;
