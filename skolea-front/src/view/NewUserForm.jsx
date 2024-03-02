import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import de useNavigate au lieu de useHistory
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import { createUser } from "../services/newUserServices";
import LoginServices from "../services/loginServices";

import { Container, Card } from "reactstrap";

// Définition du composant NewUserForm
const NewUserForm = () => {
  // Déclaration des états (states) pour stocker les données du formulaire
  const [name, setName] = useState(""); // Renommé de username à name pour correspondre au modèle backend
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(""); // Renommé pour correspondre au modèle backend
  const [role, setRole] = useState(""); // Utilisé pour stocker directement 'professor' ou 'student'

  const navigate = useNavigate(); // Utilisation de useNavigate pour la navigation

  // Gestionnaires d'événement pour les champs du formulaire
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleBirthdayChange = (event) => {
    setBirthday(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  // Gestionnaire d'événement pour les rôles d'utilisateur
  const handleRoleChange = (event, roleType) => {
    setRole(roleType);
  };

  // Gestionnaire d'événement pour la soumission du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault(); // Empêche le rechargement de la page lors de la soumission du formulaire

    // Crée un objet userData avec les données du formulaire
    const userData = {
      name,
      password,
      birthday,
      email,
      phoneNumber,
      role, // Directement 'professor' ou 'student' en fonction de la case cochée
    };

    try {
      // Création de l'utilisateur
      await createUser(userData);

      // Connexion automatique après l'inscription
      await LoginServices.login(email, password);

      //Redirection vers la page d'accueil ou le tableau de bord
      navigate("/home"); // Utilisez navigate pour la redirection
    } catch (error) {
      console.error(
        "Erreur lors de la création de l'utilisateur ou de la connexion :",
        error
      );
      // Gérer l'erreur ici, par exemple en affichant un message à l'utilisateur
    }
  };

  // Rendu du composant
  return (
    <>
      <Container>
        <Card style={{ padding: "50px" }}>
          <Container>
            <div className="form-container">
              <h1>Créer un nouveau compte</h1>
              <form onSubmit={handleSubmit}>
                <Box
                  component="div"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  <TextField
                    required
                    label="Nom complet"
                    value={name}
                    onChange={handleNameChange}
                  />
                  <TextField
                    required
                    label="Mot de passe"
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  <TextField
                    required
                    label="Date de naissance"
                    type="date"
                    value={birthday}
                    onChange={handleBirthdayChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <TextField
                    required
                    label="Adresse e-mail"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                  <TextField
                    required
                    label="Numéro de téléphone"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={(e) => handleRoleChange(e, "professor")}
                      />
                    }
                    label="Je suis enseignant"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={(e) => handleRoleChange(e, "student")}
                      />
                    }
                    label="Je suis étudiant"
                  />
                  <Button type="submit" variant="contained" color="primary">
                    Envoyer
                  </Button>
                </Box>
              </form>
            </div>
          </Container>
        </Card>
      </Container>
    </>
  );
};

export default NewUserForm;
