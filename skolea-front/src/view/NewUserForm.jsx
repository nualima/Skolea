import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';

import {
  Container,
  Card,
} from "reactstrap";

const NewUserForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isTeacher, setIsTeacher] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const [educationLevel, setEducationLevel] = useState('');

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

  const handleDateOfBirthChange = (event) => {
    setDateOfBirth(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleCheckboxChangeTeacher = (event) => {
    setIsTeacher(event.target.checked);
    setIsStudent(false);
  };

  const handleCheckboxChangeStudent = (event) => {
    setIsStudent(event.target.checked);
    setIsTeacher(false);
  };

  const handleEducationLevelChange = (event) => {
    setEducationLevel(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Submitting form with username: ${username}, password: ${password}, firstName: ${firstName}, lastName: ${lastName}, dateOfBirth: ${dateOfBirth}, email: ${email}, phoneNumber: ${phoneNumber}, isTeacher: ${isTeacher}, educationLevel: ${educationLevel}`);
  };

  return (
    <Card style={{ paddingTop: "50px", paddingBottom: "50px" }}>
      <Container>
        <div className="form-container">
          <h1>Form</h1>
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
                label="Username"
                value={username}
                onChange={handleUsernameChange}
              />
              <TextField
                required
                id="password"
                label="Password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
              />
              <TextField
                required
                id="firstName"
                label="First Name"
                value={firstName}
                onChange={handleFirstNameChange}
              />
              <TextField
                required
                id="lastName"
                label="Last Name"
                value={lastName}
                onChange={handleLastNameChange}
              />
              <TextField
                required
                id="dateOfBirth"
                label="Date of Birth"
                type="date"
                value={dateOfBirth}
                onChange={handleDateOfBirthChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                required
                id="email"
                label="Email"
                type="email"
                value={email}
                onChange={handleEmailChange}
              />
              <TextField
                required
                id="phoneNumber"
                label="Phone Number"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isTeacher}
                    onChange={handleCheckboxChangeTeacher}
                  />
                }
                label="I am a teacher"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isStudent}
                    onChange={handleCheckboxChangeStudent}
                  />
                }
                label="I am a student"
              />
              {isStudent && (
                <TextField
                  required
                  id="educationLevel"
                  label="Education Level"
                  value={educationLevel}
                  onChange={handleEducationLevelChange}
                />
              )}
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Box>
          </form>
        </div>
      </Container>
    </Card>
  );
};

export default NewUserForm;
