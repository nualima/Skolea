import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import "./navbar.scss";
import { useTranslation } from "react-i18next";
import { UserContext } from "../../context";

const Navbar = () => {
  const { userData } = useContext(UserContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [menuOpen, setMenuOpen] = useState(false);

  // Pas besoin d'utiliser useState ici puisque vous pouvez déduire si un utilisateur est authentifié
  // directement à partir de userData
  const isAuthenticated = Boolean(userData);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/home");
    // Forcer le rechargement de la page pour appliquer les changements d'état d'authentification
    window.location.reload();
  };

  const renderLinks = () => {
    const links = [
      <li key="home">
        <Link to="/home">
          <button className="btn">{t("navbar.home")}</button>
        </Link>
      </li>,
      <li key="contact">
        <Link to="/contact">
          <button className="btn">{t("navbar.contact")}</button>
        </Link>
      </li>,
    ];

    if (isAuthenticated) {
      // Utilisateur authentifié
      if (userData?.status === "teacher") {
        links.push(
          <li key="availability">
            <Link to="/availability">
              <button className="btn">{t("navbar.availability")}</button>
            </Link>
          </li>
        );
      } else if (userData?.status === "student") {
        links.push(
          <li key="reservation">
            <Link to="/reservation">
              <button className="btn">{t("navbar.reservation")}</button>
            </Link>
          </li>
        );
      }

      // Ajout du bouton de déconnexion et du lien vers le profil pour les utilisateurs authentifiés
      links.push(
        <li key="logout">
          <button className="btn" onClick={handleLogout}>
            {t("navbar.logout")}
          </button>
        </li>,
        <li key="profil">
          <Link to="/profil">
            <button className="btn">{t("navbar.profil")}</button>
          </Link>
        </li>
      );
    } else {
      // Utilisateur non authentifié
      links.push(
        <li key="login">
          <Link to="/login">
            <button className="btn">{t("navbar.login")}</button>
          </Link>
        </li>
      );
    }

    return links;
  };

  return (
    <nav className="navbar">
      <Link to="/home" style={{ textDecoration: "none", color: "inherit" }}>
        SKOLEA
      </Link>
      <ul className={`navbar__links ${menuOpen ? "is-active" : ""}`}>
        {renderLinks()}
      </ul>
      <div
        className="navbar__toggle"
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        {menuOpen ? <AiOutlineClose /> : <BiMenuAltRight />}
      </div>
    </nav>
  );
};

export default Navbar;
