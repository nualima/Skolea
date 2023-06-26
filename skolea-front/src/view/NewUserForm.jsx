import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';

import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  // Button,

} from "reactstrap";

const NewUserForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isTeacher, setIsTeacher] = useState(false);
  const [isStudent, setIsStudent] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleCheckboxChangeTeacher = (event) => {
    setIsTeacher(event.target.checked);
    setIsStudent(false);
  };

  const handleCheckboxChangeStudent = (event) => {
    setIsStudent(event.target.checked);
    setIsTeacher(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Submitting form with username: ${username}, password: ${password}, firstName: ${firstName}, lastName: ${lastName}, isTeacher: ${isTeacher}`);
  };

  return (

    <>
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
                <TextField
                  required
                  id="username"
                  label="Identifiant"
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
                  id="firstName"
                  label="Prénom"
                  value={firstName}
                  onChange={handleFirstNameChange}
                />
                <TextField
                  required
                  id="lastName"
                  label="Nom de famille"
                  value={lastName}
                  onChange={handleLastNameChange}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isTeacher}
                      onChange={handleCheckboxChangeTeacher}
                    />
                  }
                  label="Je suis un professeur"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isStudent}
                      onChange={handleCheckboxChangeStudent}
                    />
                  }
                  label="Je suis un étudiant"
                />
                <Button type="submit" variant="contained" color="primary">
                  Soumettre
                </Button>
              </Box>
            </form>
          </div>

      </Container>
    </>
  );
};

export default NewUserForm;
