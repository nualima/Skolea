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
import ExempleNavbar from '../components/ExempleNavbar';

const NewUserForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [birthday, setBirthday] = useState('');
  const [email, setEmail] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [statue, setStatue] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const [educationLevel, setEducationLevel] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlefirstnameChange = (event) => {
    setFirstname(event.target.value);
  };

  const handlelastnameChange = (event) => {
    setLastname(event.target.value);
  };

  const handlebirthdayChange = (event) => {
    setBirthday(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlephonenumberChange = (event) => {
    setPhonenumber(event.target.value);
  };

  const handleCheckboxChangeTeacher = (event) => {
    setStatue(event.target.checked);
    setIsStudent(false);
  };
  
  const handleCheckboxChangeStudent = (event) => {
    setIsStudent(event.target.checked);
    setStatue(false);
  };
  

  const handleEducationLevelChange = (event) => {
    setEducationLevel(event.target.value);
  };


    const handleSubmit = async (event) => {
      event.preventDefault();
      
      try {
        const userData ={
          username,
          password,
          firstname,
          lastname,
          birthday,
          email,
          phonenumber,
          statue: statue ? 'teacher' : 'student',
          educationLevel: statue ? '' : educationLevel, // Set educationLevel to empty string if statue is true
        };
  
        const response = await createUser(userData);
  
        const { success, token } = response;
  
        if (success) {
          // Handle successful user creation
          // Do something with the token, e.g., store it in localStorage
        } else {
          // Handle failed user creation
        }
      } catch (error) {
        // Handle error
        console.error('Error creating user:', error);
      }
    };

  

  return (
    <>
    <Container>
    <Card style={{ padding:"50px"}}>
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
                id="firstname"
                label="First Name"
                value={firstname}
                onChange={handlefirstnameChange}
              />
              <TextField
                required
                id="lastname"
                label="Last Name"
                value={lastname}
                onChange={handlelastnameChange}
              />
              <TextField
                required
                id="birthday"
                label="Date of Birth"
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
                label="Email"
                type="email"
                value={email}
                onChange={handleEmailChange}
              />
              <TextField
                required
                id="phonenumber"
                label="Phone Number"
                value={phonenumber}
                onChange={handlephonenumberChange}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={statue}
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
    </Container>
    </>
  );
};

export default NewUserForm;
