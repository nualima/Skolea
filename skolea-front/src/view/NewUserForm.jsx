// Import des bibliothèques et composants nécessaires
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import { createUser } from '../services/newUserServices';

import {
  Container,
  Card,
} from "reactstrap";

// Définition du composant NewUserForm
const NewUserForm = () => {
  // Déclaration des états (states) pour stocker les données du formulaire
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [birthday, setBirthday] = useState('');
  const [email, setEmail] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [role, setrole] = useState(false); // Statut de l'utilisateur (enseignant ou étudiant)
  const [isStudent, setIsStudent] = useState(false); // Indique si l'utilisateur est un étudiant
  const [educationLevel, setEducationLevel] = useState(''); // Niveau d'éducation de l'étudiant

  // Gestionnaire d'événement pour le changement de nom d'utilisateur
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  // Gestionnaire d'événement pour le changement de mot de passe
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Gestionnaire d'événement pour le changement de prénom
  const handlefirstnameChange = (event) => {
    setFirstname(event.target.value);
  };

  // Gestionnaire d'événement pour le changement de nom de famille
  const handlelastnameChange = (event) => {
    setLastname(event.target.value);
  };

  // Gestionnaire d'événement pour le changement de date de naissance
  const handlebirthdayChange = (event) => {
    setBirthday(event.target.value);
  };

  // Gestionnaire d'événement pour le changement d'adresse e-mail
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // Gestionnaire d'événement pour le changement de numéro de téléphone
  const handlephonenumberChange = (event) => {
    setPhonenumber(event.target.value);
  };

  // Gestionnaire d'événement pour la case à cocher "Je suis enseignant"
  const handleCheckboxChangeTeacher = (event) => {
    setrole(event.target.checked); // Définit le statut comme enseignant
    setIsStudent(false); // Réinitialise l'indicateur "étudiant"
  };
  
  // Gestionnaire d'événement pour la case à cocher "Je suis étudiant"
  const handleCheckboxChangeStudent = (event) => {
    setIsStudent(event.target.checked); // Définit l'indicateur "étudiant"
    setrole(false); // Réinitialise le statut
  };

  // Gestionnaire d'événement pour le changement du niveau d'éducation (uniquement si l'utilisateur est un étudiant)
  const handleEducationLevelChange = (event) => {
    setEducationLevel(event.target.value);
  };

  // Gestionnaire d'événement pour la soumission du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault(); // Empêche le rechargement de la page lors de la soumission du formulaire
    
    try {
      // Crée un objet userData avec les données du formulaire
      const userData ={
        username,
        password,
        firstname,
        lastname,
        birthday,
        email,
        phonenumber,
        role: role ? 'teacher' : 'student', // Détermine le statut en fonction de la case cochée
        educationLevel: role ? '' : educationLevel, // Détermine le niveau d'éducation (vide si enseignant)
      };

      // Appelle la fonction createUser pour envoyer les données utilisateur au serveur
      const response = await createUser(userData);

      const { success, token } = response;

      if (success) {
        // Gère la création réussie de l'utilisateur
        
        // (Optionnel) Faire quelque chose avec le jeton, par exemple, le stocker dans localStorage
        
      } else {
        // Gère l'échec de la création de l'utilisateur
        
      }
    } catch (error) {
      // Gère les erreurs
      console.error('Erreur lors de la création de l\'utilisateur :', error);
    }
  };

  // Rendu du composant
  return (
    <>
    <Container>
    <Card style={{ padding:"50px"}}>
      <Container>
        <div className="form-container">
          <h1>Formulaire</h1>
          <form onSubmit={handleSubmit}>
            <Box
              component="div"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              {/* Champs de texte pour les informations de l'utilisateur */}
              <TextField
                required
                id="username"
                label="Nom d'utilisateur"
                value={username}
                onChange={handleUsernameChange}
              />
              <TextField
                required
                id="password"
                label="Mot de passe"
                type="password"
                value={password}
                onChange={handlePasswordChange}
              />
              <TextField
                required
                id="firstname"
                label="Prénom"
                value={firstname}
                onChange={handlefirstnameChange}
              />
              <TextField
                required
                id="lastname"
                label="Nom de famille"
                value={lastname}
                onChange={handlelastnameChange}
              />
              <TextField
                required
                id="birthday"
                label="Date de naissance"
                type="date"
                value={birthday}
                onChange={handlebirthdayChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                required
                id="email"
                label="Adresse e-mail"
                type="email"
                value={email}
                onChange={handleEmailChange}
              />
              <TextField
                required
                id="phonenumber"
                label="Numéro de téléphone"
                value={phonenumber}
                onChange={handlephonenumberChange}
              />
              {/* Cases à cocher pour définir le statut de l'utilisateur */}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={role}
                    onChange={handleCheckboxChangeTeacher}
                  />
                }
                label="Je suis enseignant"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isStudent}
                    onChange={handleCheckboxChangeStudent}
                  />
                }
                label="Je suis étudiant"
              />
              {/* Champ de texte pour le niveau d'éducation (visible uniquement si l'utilisateur est un étudiant) */}
              {isStudent && (
                <TextField
                  required
                  id="educationLevel"
                  label="Niveau d'éducation"
                  value={educationLevel}
                  onChange={handleEducationLevelChange}
                />
              )}
              {/* Bouton de soumission du formulaire */}
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
