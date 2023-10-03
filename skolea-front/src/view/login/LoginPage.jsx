import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./loginPage.css";
import { Card } from "@mui/material";
import LoginServices from "../../services/loginServices";
import { UserContext } from "../../context";

const LoginPage = () => {
  // États pour gérer les champs du formulaire, les erreurs et le contexte utilisateur
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Utilisation de useNavigate pour la navigation
  const navigate = useNavigate();
  
  // Utilisation du contexte utilisateur pour stocker les informations utilisateur
  const { userData, setUserData } = useContext(UserContext);

  // Gestionnaire de clic sur le bouton "Log in"
  const onButtonClick = async () => {
    // Réinitialiser les messages d'erreur
    setEmailError("");
    setPasswordError("");

    // Vérifier si l'utilisateur a correctement saisi les champs
    if ("" === email) {
      setEmailError("Veuillez entrer votre adresse e-mail");
      return;
    }

    if ("" === password) {
      setPasswordError("Veuillez entrer un mot de passe");
      return;
    }

    if (password.length < 8) {
      setPasswordError("Le mot de passe doit comporter au moins 8 caractères");
      return;
    }

    try {
      // Appeler le service de connexion (LoginServices) pour vérifier les informations d'authentification
      const { success, data, errors, error } = await LoginServices.login(email, password);

      if (success) {
        // Rediriger l'utilisateur vers la page d'accueil s'il est authentifié avec succès
        navigate("/home");

        // Mettre à jour les informations de l'utilisateur dans le contexte
        setUserData(data);

        // Gérer les actions à effectuer en cas d'authentification réussie (par exemple, stocker le jeton, etc.)

      } else if (errors) {
        // Gérer les erreurs de validation (par exemple, email ou mot de passe incorrect)
        setEmailError(errors.emailError);
        setPasswordError(errors.passwordError);
      } else {
        // Gérer les erreurs de connexion générales
        console.error("Erreur lors de la connexion :", error);
      }
    } catch (error) {
      // Gérer les erreurs réseau ou autres
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
          {/* Champ de saisie pour l'adresse e-mail */}
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
          {/* Champ de saisie pour le mot de passe */}
          <input
            value={password}
            placeholder="Entrez votre mot de passe ici"
            onChange={(ev) => setPassword(ev.target.value)}
            className="inputBox"
          />
          <label className="errorLabel">{passwordError}</label>
        </div>
        <br />
        <div className="inputContainer">
          {/* Bouton de connexion */}
          <input className="inputButton" type="button" onClick={onButtonClick} value="Se connecter" />
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
