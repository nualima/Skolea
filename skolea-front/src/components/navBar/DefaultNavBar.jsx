import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import './navbar.scss';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { UserContext } from "../../context";



import { Link } from 'react-router-dom';


const NavbarTest = () => {
  const { userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();


    const { t } = useTranslation();

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
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate("/home");
      };

      const renderLinks = () => {
        let navLinks = [];
      
        if (userData && userData.statue) { // Ajouter une vérification de nullité
          switch (userData.statue) {
            case "admin":
              navLinks = ["home", "profil", "users"];
              break;
            case "teacher":
              navLinks = ["home", "profile", "availability"];
              break;
            case "student":
              navLinks = ["home", "profile", "reservation"];
              break;
            default:
              navLinks = ["home", "contact"];
          }
        }
        
        return navLinks.map((link) => (
          <li key={link}>
            <Link to={`/${link}`}>{t(`navbar.${link}`)}</Link>
          </li>
        ));
      };

        return (
            <header className={`header ${isScrolled ? "header--blue" : ""}`}>
              <div className="header__content">
                <span className="header__content__logo">Navbar</span>
                <nav className="header__content__nav">
                  <ul>
                    
                    {renderLinks()}
                  </ul>
                  {isAuthenticated ? (
                            <button className="btn" onClick={handleLogout}>
                                Se déconnecter
                            </button>
                        ) : (
                            <>
                                <Link to="/signUp">
                                    <button className="btn">Inscription</button>
                                </Link>
                                <Link to="/login">
                                    <button className="btn btn__login" >Connexion</button>
                                    </Link>
                            </>
                        )}
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
