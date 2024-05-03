import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  CardContent,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Select,
  MenuItem,
  FormControl, // Ajouté pour gérer le groupement du Select
  InputLabel, // Ajouté pour étiqueter le Select
  OutlinedInput, // Ajouté pour utiliser comme input du Select
  Chip, // Ajouté pour l'affichage des valeurs sélectionnées
} from "@mui/material";
import { createUser } from "../services/newUserServices";
import LoginServices from "../services/loginServices";

const NewUserForm = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("");
  const [isProfessor, setIsProfessor] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState([]); // Initialement un tableau vide
  const [department, setDepartment] = useState("");
  const [level, setLevel] = useState("");
  const [cityNames, setCityNames] = useState([]);
  const [price, setPrice] = useState(""); // Ajout d'un état pour gérer le prix

  const subjects = [
    "Mathématiques",
    "Sciences",
    "Histoire",
    "Géographie",
    "Langues",
    "Physique",
    "Chimie",
    "Biologie",
    "Arts",
  ];
  const levels = [
    "CP",
    "CE1",
    "CE2",
    "CM1",
    "CM2",
    "6ème",
    "5ème",
    "4ème",
    "3ème",
    "2nd",
    "1ère",
    "Terminale",
  ];

  const navigate = useNavigate();

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

  const handleCityNameChange = (event) => {
    const value = event.target.value;
    setCityNames(typeof value === "string" ? value.split(",") : value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleRoleChange = (event, roleType) => {
    setRole(roleType);
    if (roleType === "professor") {
      setIsProfessor(true);
      setIsStudent(false);
    } else if (roleType === "student") {
      setIsStudent(true);
      setIsProfessor(false);
    }
  };

  const handleSubjectChange = (event) => {
    const value = event.target.value;
    setSelectedSubjects(typeof value === "string" ? value.split(",") : value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      name,
      password,
      birthday,
      email,
      phoneNumber,
      role,
      subjects: selectedSubjects,
      department,
      educationLevel: level,
      cityNames,
      price: role === "professor" ? price : undefined, // N'envoyer le prix que pour les professeurs
    };

    try {
      await createUser(userData);
      await LoginServices.login(email, password);
      navigate("/home");
    } catch (error) {
      console.error("Error creating user or logging in:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Card>
        <CardContent>
          <h1>Créer un nouveau compte</h1>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              required
              label="Nom complet"
              value={name}
              onChange={handleNameChange}
              margin="normal"
            />
            <TextField
              fullWidth
              required
              label="Mot de passe"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              margin="normal"
            />
            <TextField
              fullWidth
              required
              label="Date de naissance"
              type="date"
              value={birthday}
              onChange={handleBirthdayChange}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              fullWidth
              required
              label="Adresse e-mail"
              type="email"
              value={email}
              onChange={handleEmailChange}
              margin="normal"
            />
            <TextField
              fullWidth
              required
              label="Numéro de téléphone"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              margin="normal"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={isProfessor}
                  onChange={(e) => handleRoleChange(e, "professor")}
                />
              }
              label="Je suis enseignant"
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={isStudent}
                  onChange={(e) => handleRoleChange(e, "student")}
                />
              }
              label="Je suis étudiant"
            />

            {isProfessor && (
              <>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="subjects-label">Matières</InputLabel>
                  <Select
                    labelId="subjects-label"
                    multiple
                    value={selectedSubjects}
                    onChange={handleSubjectChange}
                    input={
                      <OutlinedInput
                        id="select-multiple-chip"
                        label="Matières"
                      />
                    }
                    renderValue={(selected) => (
                      <div>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </div>
                    )}
                  >
                    {subjects.map((subject) => (
                      <MenuItem key={subject} value={subject}>
                        {subject}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="cityNames-label">Noms des villes</InputLabel>
                  <Select
                    labelId="cityNames-label"
                    multiple
                    value={cityNames}
                    onChange={handleCityNameChange}
                    input={
                      <OutlinedInput
                        id="select-multiple-chip-city"
                        label="Noms des villes"
                      />
                    }
                    renderValue={(selected) => (
                      <div>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </div>
                    )}
                  >
                    {["nice", "cannes", "antibes"].map((city) => (
                      <MenuItem key={city} value={city}>
                        {city}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  required
                  label="Tarif/Horaire (€/h)"
                  value={price}
                  onChange={handlePriceChange}
                  margin="normal"
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }} // Assurez que la valeur est non-négative
                />
              </>
            )}

            {isStudent && (
              <FormControl fullWidth margin="normal">
                <InputLabel id="level-label">Niveau</InputLabel>
                <Select
                  labelId="level-label"
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  input={<OutlinedInput label="Niveau" />}
                >
                  {levels.map((level) => (
                    <MenuItem key={level} value={level}>
                      {level}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            <Button type="submit" variant="contained" color="primary">
              Envoyer
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default NewUserForm;
