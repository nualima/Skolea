import React, { useState } from 'react';

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
    setIsStudent(false); // Décoche l'autre option si celle-ci est cochée
  };

  const handleCheckboxChangeStudent = (event) => {
    setIsStudent(event.target.checked);
    setIsTeacher(false); // Décoche l'autre option si celle-ci est cochée
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Submitting form with username: ${username}, password: ${password}, firstName: ${firstName}, lastName: ${lastName}, isTeacher: ${isTeacher}`);
  };

  return (
    <div className="form-container">
      <h1>Formulaire</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Identifiant</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={handleUsernameChange}
        />

        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <label htmlFor="firstName">Prénom</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={firstName}
          onChange={handleFirstNameChange}
        />

        <label htmlFor="lastName">Nom de famille</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={lastName}
          onChange={handleLastNameChange}
        />

        <div>
          <input
            type="checkbox"
            id="isTeacher"
            name="isTeacher"
            checked={isTeacher}
            onChange={handleCheckboxChangeTeacher}
          />
          <label htmlFor="isTeacher">Je suis un professeur</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="isStudent"
            name="isStudent"
            checked={isStudent}
            onChange={handleCheckboxChangeStudent}
          />
          <label htmlFor="isStudent">Je suis un étudiant</label>
        </div>

        <button type="submit" style={{ backgroundColor: 'blue', color: 'white' }}>
          Soumettre
        </button>
      </form>
    </div>
  );
};

export default NewUserForm;
