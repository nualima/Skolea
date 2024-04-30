import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card } from "@mui/material";
import Subject from "./Subject";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";

function Reservation() {
  const [reservation, setReservation] = useState({
    subject: "",
    city: "",
  });
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [cityValid, setCityValid] = useState(false); // Pour suivre si la ville est valide
  const [error, setError] = useState(""); // Ajoutez cette ligne pour définir l'état d'erreur

  const navigate = useNavigate();

  useEffect(() => {
    if (inputValue.length > 1) {
      fetchVilles(inputValue);
    } else {
      setSuggestions([]);
    }
  }, [inputValue]);


  // Liste des matières courantes
  const subjects = [
    "Mathématiques",
    "Physique",
    "Chimie",
    "Biologie",
    "Histoire",
    "Géographie",
    "Anglais",
    "Français",
    "Philosophie",
    "Économie",
  ];

  const handleSelectSubject = (subject) => {
    // Si la matière sélectionnée est la même que celle déjà sélectionnée, désélectionnez-la
    if (reservation.subject === subject.name) {
      setReservation({ ...reservation, subject: "" });
    } else {
      // Sinon, mettez à jour la matière sélectionnée
      setReservation({ ...reservation, subject: subject.name });
    }
  };



  const fetchVilles = async (searchTerm) => {
    setIsFetching(true);
    try {
      const response = await axios.get(`https://geo.api.gouv.fr/communes`, {
        params: {
          nom: searchTerm,
          fields: "nom",
          limit: 10,
          format: "json",
          geometry: "centre",
        },
      });
      setSuggestions(response.data);
      setIsFetching(false);
      setCityValid(false);
    } catch (error) {
      console.error("Erreur lors de la récupération des villes:", error);
      setIsFetching(false);
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservation({ ...reservation, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (reservation.subject === "" || !cityValid) {
      setError("Veuillez sélectionner une matière et une ville valides.");
      return;
    }

    // Rediriger vers la page de résultats avec les paramètres de recherche
    navigate(`/reservation/search?subject=${reservation.subject}&city=${reservation.city}`);
  };

  const handleSelectCity = (nom) => {
    setInputValue(nom);
    setReservation({ ...reservation, city: nom });
    setSuggestions([]);
    setCityValid(true);
  };

  const clearCity = () => {
    setInputValue("");
    setReservation({ ...reservation, city: "" });
    setCityValid(false);
  };
  return (
    <Container>
      <Card>
        <Row className="my-5">
          <Col md={{ size: 8, offset: 2 }}>
            <h2 className="text-center mb-4">Réserver une séance</h2>
            <Form onSubmit={handleSubmit}>
              {/* Champ Matière */}
              <div style={{ marginBottom: "50px" }}>
                <Subject
                  onSelect={handleSelectSubject}
                  selectedSubject={reservation.subject}
                />
              </div>
              {/* Champ Ville avec auto-complétion */}
              <FormGroup>
                <div className="autocomplete-wrapper">
                  <Input
                    id="ville"
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Commencez à taper une ville..."
                    disabled={cityValid} // Désactiver le champ si une ville est validement sélectionnée
                  />
                  {inputValue && cityValid && (
                    <span
                      className="clear-btn"
                      onClick={clearCity}
                      style={{ cursor: "pointer" }}
                    >
                      X
                    </span> // Bouton pour effacer la ville sélectionnée
                  )}
                </div>
                {isFetching && <div>Chargement...</div>}
                <div className="auto-complete-suggestions">
                  {suggestions.length > 0 && (
                    <ul>
                      {suggestions.map((ville, index) => (
                        <li
                          key={index}
                          onClick={() => handleSelectCity(ville.nom)}
                          style={{ cursor: "pointer" }}
                        >
                          {ville.nom}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </FormGroup>

              <Button
                type="submit"
                color="primary"
                size="lg"
                block
                disabled={!cityValid || reservation.subject === ""} // Désactive le bouton si aucune matière n'est sélectionnée ou si la ville n'est pas valide
              >
                Chercher
              </Button>
            </Form>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

export default Reservation;
