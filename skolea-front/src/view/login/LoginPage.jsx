import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom"; // Ajout de Link ici
import "./loginPage.css";
import { Card, Button } from "@mui/material";
import LoginServices from "../../services/loginServices";
import { UserContext } from "../../context";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();
  const { setUserData } = useContext(UserContext);

  const onLoginClick = async () => {
    setEmailError("");
    setPasswordError("");

    if (email === "") {
      setEmailError("Veuillez entrer votre adresse e-mail");
      return;
    }

    if (password === "") {
      setPasswordError("Veuillez entrer un mot de passe");
      return;
    }

    if (password.length < 8) {
      setPasswordError("Le mot de passe doit comporter au moins 8 caractères");
      return;
    }

    try {
      const response = await LoginServices.login(email, password);
      if (response) {
        setUserData(response.user);
        setTimeout(() => {
          navigate("/home");
        }, 500);
      } else {
        console.error(
          "Erreur lors de la connexion : Aucun succès",
          response.error
        );
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
    }
  };

  return (
    <div className="mainContainer">
      <Card style={{ padding: "25px" }}>
        <div className="titleContainer">
          <div>Login</div>
        </div>
        <br />
        <div className="inputContainer">
          <input
            value={email}
            placeholder="Entrez votre adresse e-mail ici"
            onChange={(ev) => setEmail(ev.target.value)}
            className="inputBox"
          />
          <label className="errorLabel">{emailError}</label>
        </div>
        <br />
        <div className="inputContainer">
          <input
            type="password" // Modifié pour cacher le mot de passe
            value={password}
            placeholder="Entrez votre mot de passe ici"
            onChange={(ev) => setPassword(ev.target.value)}
            className="inputBox"
          />
          <label className="errorLabel">{passwordError}</label>
        </div>
        <br />
        <div className="inputContainer">
          <input
            className="inputButton"
            type="button"
            onClick={onLoginClick}
            value="Se connecter"
          />
          {/* Utilisation de Link avec Button pour une navigation SPA */}
          <Link to="/signUp" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              color="primary"
              style={{ marginLeft: "10px" }}
            >
              Créer un compte
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
